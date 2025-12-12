import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Select from '../select';

describe('Select Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  describe('Basic Rendering', () => {
    it('should render with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Choose..." />);
      expect(screen.getByText('Choose...')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Select options={mockOptions} label="Select Item" />);
      expect(screen.getByText('Select Item')).toBeInTheDocument();
    });

    it('should render default placeholder when not provided', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });
  });

  describe('Options Display', () => {
    it('should show options when clicked', async () => {
      render(<Select options={mockOptions} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });
  });

  describe('Selection', () => {
    it('should call onChange when option is selected', async () => {
      const onChange = vi.fn();
      render(<Select options={mockOptions} onChange={onChange} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Option 1'));
      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should show selected value', () => {
      render(<Select options={mockOptions} value="2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Select options={mockOptions} disabled />);
      const trigger = screen.getByText('Select...');
      expect(trigger.closest('button')).toHaveAttribute('disabled');
    });

    it('should not open when disabled', () => {
      render(<Select options={mockOptions} disabled />);

      fireEvent.click(screen.getByText('Select...'));

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Select options={mockOptions} className="custom-select" />);
      expect(container.querySelector('.custom-select')).toBeInTheDocument();
    });
  });

  describe('Multiple Selection', () => {
    it('should support multiple prop', () => {
      render(<Select options={mockOptions} multiple />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });
  });
});
