import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DatePicker from '../ui/date-picker';

describe('DatePicker Component', () => {
  const mockOnChange = vi.fn();

  describe('Basic Rendering', () => {
    it('should render date picker in single mode by default', () => {
      const { container } = render(<DatePicker onChange={mockOnChange} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render segment inputs (GG/AA/YYYY) in single mode', () => {
      render(<DatePicker onChange={mockOnChange} />);
      // The segmented input renders three readonly inputs
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThanOrEqual(3);
    });

    it('should render without errors when only onChange provided', () => {
      const { container } = render(<DatePicker onChange={mockOnChange} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Mode', () => {
    it('should render range trigger button in range mode', () => {
      const { container } = render(
        <DatePicker
          mode="range"
          onChange={mockOnChange}
        />,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should pre-fill segments when a Date value is provided', () => {
      const date = new Date(2024, 0, 15); // 15 Jan 2024
      render(
        <DatePicker
          onChange={mockOnChange}
          value={date}
        />,
      );
      const inputs = screen.getAllByRole('textbox');
      // day input
      expect((inputs[0] as HTMLInputElement).value).toBe('15');
    });
  });

  describe('Disabled State', () => {
    it('should disable all segment inputs when disabled prop is true', () => {
      render(
        <DatePicker
          onChange={mockOnChange}
          disabled
        />,
      );
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });
  });

  describe('Error State', () => {
    it('should apply error styling when error prop is true', () => {
      const { container } = render(
        <DatePicker
          onChange={mockOnChange}
          error
        />,
      );
      const wrapper = container.querySelector('.border-red-500');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Calendar Icon', () => {
    it('should render the calendar toggle button', () => {
      render(<DatePicker onChange={mockOnChange} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
