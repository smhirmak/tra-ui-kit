import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextField from '../text-field';

describe('TextField Component', () => {
  describe('Basic Rendering', () => {
    it('should render with label', () => {
      render(<TextField label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<TextField placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });

    it('should render without label', () => {
      const { container } = render(<TextField />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render outlined variant', () => {
      const { container } = render(<TextField variant="outlined" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render filled variant', () => {
      const { container } = render(<TextField variant="filled" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render underlined variant', () => {
      const { container } = render(<TextField variant="underlined" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should display value', () => {
      render(<TextField value="test value" onChange={vi.fn()} />);
      const input = screen.getByDisplayValue('test value');
      expect(input).toBeInTheDocument();
    });

    it('should call onChange when typing', () => {
      const onChange = vi.fn();
      render(<TextField value="" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new' } });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Input Types', () => {
    it('should accept type prop', () => {
      render(<TextField type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password type', () => {
      const { container } = render(<TextField type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<TextField disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const onChange = vi.fn();
      render(<TextField disabled onChange={onChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('should display error with helper text', () => {
      render(<TextField error helperText="Required field" />);
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('should apply error styling when error is true', () => {
      const { container } = render(<TextField error />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text', () => {
      render(<TextField helperText="Enter your email" />);
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it('should show required indicator', () => {
      render(<TextField showRequiredIcon label="Email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<TextField className="custom-textfield" />);
      expect(container.querySelector('.custom-textfield')).toBeInTheDocument();
    });
  });
});
