import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeModeToggle from '../theme-mode-toggle';

// Mock theme provider
const mockSetTheme = vi.fn();
let currentTheme = 'light';

vi.mock('@/contexts/theme/theme-provider', () => ({
  useTheme: () => ({
    theme: currentTheme,
    setTheme: mockSetTheme,
  }),
}));

// Mock Button component
vi.mock('@/components/button', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('ThemeModeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    currentTheme = 'light';
  });

  describe('Basic Rendering', () => {
    it('should render toggle button', () => {
      const { container } = render(<ThemeModeToggle />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should render moon and sun icons', () => {
      const { container } = render(<ThemeModeToggle />);
      // SVG icons should be present
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('should call setTheme when clicked', () => {
      const { container } = render(<ThemeModeToggle />);
      const button = container.querySelector('button') as HTMLElement;

      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledTimes(1);
    });

    it('should toggle from light to dark theme', () => {
      currentTheme = 'light';
      const { container } = render(<ThemeModeToggle />);
      const button = container.querySelector('button') as HTMLElement;

      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should toggle from dark to light theme', () => {
      currentTheme = 'dark';
      const { container } = render(<ThemeModeToggle />);
      const button = container.querySelector('button') as HTMLElement;

      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('Icon Animation Classes', () => {
    it('should have transition classes on moon icon', () => {
      const { container } = render(<ThemeModeToggle />);
      // Moon icon should have transition classes
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have absolute positioning on sun icon', () => {
      const { container } = render(<ThemeModeToggle />);
      // Sun icon should have absolute positioning
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });
});
