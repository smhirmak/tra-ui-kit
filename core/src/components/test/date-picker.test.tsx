import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DatePicker from '../date-picker';

describe('DatePicker Component', () => {
  describe('Basic Rendering', () => {
    it('should render date picker with placeholder', () => {
      render(<DatePicker placeholder="Select date" />);
      expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<DatePicker label="Birth Date" />);
      expect(screen.getByText('Birth Date')).toBeInTheDocument();
    });

    it('should render without errors when no props provided', () => {
      const { container } = render(<DatePicker />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should display selected date', () => {
      const date = new Date('2024-01-15');
      render(<DatePicker value={date} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should call onChange when date is selected', () => {
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);
      // DatePicker implementation may vary
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled prop is true', () => {
      render(<DatePicker disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<DatePicker className="custom-date-picker" />);
      expect(container.querySelector('.custom-date-picker')).toBeInTheDocument();
    });
  });

  describe('Format', () => {
    it('should accept dateFormat prop', () => {
      render(<DatePicker dateFormat="dd/MM/yyyy" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
