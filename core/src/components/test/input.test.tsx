import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../input';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('should render with placeholder', () => {
      render(<Input placeholder="Type here..." />);
      expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
    });

    it('should render without errors when no props provided', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should display value', () => {
      render(
        <Input
          value="test"
          onChange={vi.fn()}
        />,
      );
      const input = screen.getByDisplayValue('test');
      expect(input).toBeInTheDocument();
    });

    it('should call onChange when typing', () => {
      const onChange = vi.fn();
      render(
        <Input
          value=""
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new text' } });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Input Types', () => {
    it('should render text type by default', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should accept type prop', () => {
      const { container } = render(<Input type="email" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const onChange = vi.fn();
      render(
        <Input
          disabled
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Input className="custom-input" />);
      expect(container.querySelector('.custom-input')).toBeInTheDocument();
    });
  });

  describe('ID Prop', () => {
    it('should apply id to input', () => {
      const { container } = render(<Input id="test-input" />);
      const input = container.querySelector('#test-input');
      expect(input).toBeInTheDocument();
    });
  });
});
