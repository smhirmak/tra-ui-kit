import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguangeSelect from '../languange-select';

// Mock LocalizeContext
const mockSetLocale = vi.fn();
vi.mock('@/contexts/locale/LocalizeContext', () => ({
  useLocalizeContext: () => ({
    setLocale: mockSetLocale,
  }),
}));

// Mock Select component
vi.mock('../select', () => ({
  default: ({ options, onChange, defaultValue, dropdownTriggerClassName }: any) => (
    <div data-testid="select-mock">
      <button onClick={() => onChange && onChange('tr')}>TR</button>
      <button onClick={() => onChange && onChange('en')}>EN</button>
      <span data-testid="default-value">{defaultValue}</span>
      <span data-testid="trigger-class">{dropdownTriggerClassName}</span>
    </div>
  ),
}));

describe('LanguangeSelect Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSetLocale.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render select component', () => {
      render(<LanguangeSelect />);
      expect(screen.getByTestId('select-mock')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<LanguangeSelect className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should pass border-none to select trigger', () => {
      render(<LanguangeSelect />);
      expect(screen.getByTestId('trigger-class')).toHaveTextContent('border-none');
    });
  });

  describe('Language Selection', () => {
    it('should call setLocale when selecting TR', async () => {
      render(<LanguangeSelect />);

      const trButton = screen.getByText('TR');
      fireEvent.click(trButton);

      await waitFor(() => {
        expect(mockSetLocale).toHaveBeenCalledWith('tr');
      });
    });

    it('should call setLocale when selecting EN', async () => {
      render(<LanguangeSelect />);

      const enButton = screen.getByText('EN');
      fireEvent.click(enButton);

      await waitFor(() => {
        expect(mockSetLocale).toHaveBeenCalledWith('en');
      });
    });

    it('should save selected language to localStorage', async () => {
      render(<LanguangeSelect />);

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
      render(<LanguangeSelect />);

      expect(screen.getByTestId('default-value')).toHaveTextContent('en');
    });

    it('should use undefined as default if localStorage is empty', () => {
      render(<LanguangeSelect />);

      const defaultValue = screen.getByTestId('default-value');
      expect(defaultValue.textContent).toBe('');
    });
  });
});
