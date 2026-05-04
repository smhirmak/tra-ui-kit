import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSelect from '../ui/language-select';

// Mock LocalizeContext
const mockSetLocale = vi.fn();
vi.mock('@/contexts/locale/LocalizeContext', () => ({
  useLocalizeContext: () => ({
    locale: 'en',
    setLocale: mockSetLocale,
  }),
}));

// Mock registry Select component (LanguageSelect imports from registry path)
vi.mock('../../../registry/msi-kit/components/select', () => ({
  default: ({ onChange, value, dropdownTriggerClassName }: any) => (
    <div data-testid="select-mock">
      <button onClick={() => onChange && onChange('tr')}>TR</button>
      <button onClick={() => onChange && onChange('en')}>EN</button>
      <span data-testid="default-value">{value}</span>
      <span data-testid="trigger-class">{dropdownTriggerClassName}</span>
    </div>
  ),
}));

describe('LanguageSelect Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSetLocale.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render select component', () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );
      expect(screen.getByTestId('select-mock')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <LanguageSelect
          className="custom-class"
          locale="en"
          setLocale={mockSetLocale}
        />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should pass border-none to select trigger', () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );
      expect(screen.getByTestId('trigger-class')).toHaveTextContent('border-none');
    });
  });

  describe('Language Selection', () => {
    it('should call setLocale when selecting TR', async () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );

      const trButton = screen.getByText('TR');
      fireEvent.click(trButton);

      await waitFor(() => {
        expect(mockSetLocale).toHaveBeenCalledWith('tr');
      });
    });

    it('should call setLocale when selecting EN', async () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );

      const enButton = screen.getByText('EN');
      fireEvent.click(enButton);

      await waitFor(() => {
        expect(mockSetLocale).toHaveBeenCalledWith('en');
      });
    });

    it('should save selected language to localStorage', async () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );

      const trButton = screen.getByText('TR');
      fireEvent.click(trButton);

      await waitFor(() => {
        expect(localStorage.getItem('lang')).toBe('tr');
      });
    });
  });

  describe('Default Value', () => {
    it('should use localStorage value as default if available', () => {
      localStorage.setItem('lang', 'en');
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );

      expect(screen.getByTestId('default-value')).toHaveTextContent('en');
    });

    it('should use locale as default when localStorage is empty', () => {
      render(
        <LanguageSelect
          locale="en"
          setLocale={mockSetLocale}
        />,
      );

      // locale from mock is 'en', so value should be 'en'
      const defaultValue = screen.getByTestId('default-value');
      expect(defaultValue).toHaveTextContent('en');
    });
  });
});
