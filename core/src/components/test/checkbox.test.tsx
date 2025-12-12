import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../checkbox';

describe('Checkbox Component', () => {
  describe('Basic Rendering', () => {
    it('should render checkbox', () => {
      const { container } = render(<Checkbox id="test-checkbox" />);
      expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Checkbox id="test" label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(<Checkbox id="test" />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should be unchecked by default', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should be checked when checked prop is true', () => {
      render(<Checkbox id="test" checked />);
      const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should toggle checked state when clicked', () => {
      render(<Checkbox id="test" label="Test" />);
      const label = screen.getByText('Test');
      const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

      expect(checkbox.checked).toBe(false);

      fireEvent.click(label);
      expect(checkbox.checked).toBe(true);

      fireEvent.click(label);
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Checkbox id="test" disabled />);
      const checkbox = screen.getByRole('checkbox', { hidden: true });
      expect(checkbox).toBeDisabled();
    });

    it('should not toggle when disabled', () => {
      render(<Checkbox id="test" disabled label="Test" />);
      const label = screen.getByText('Test');
      const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

      const initialState = checkbox.checked;
      fireEvent.click(label);
      expect(checkbox.checked).toBe(initialState);
    });

    it('should show minus icon when disabled and unchecked', () => {
      const { container } = render(<Checkbox id="test" disabled checked={false} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show check icon when disabled and checked', () => {
      const { container } = render(<Checkbox id="test" disabled checked />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply rectangular variant by default', () => {
      const { container } = render(<Checkbox id="test" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('rounded-sm');
    });

    it('should apply circular variant', () => {
      const { container } = render(<Checkbox id="test" variant="circular" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('rounded-full');
    });
  });

  describe('Sizes', () => {
    it('should apply default size', () => {
      const { container } = render(<Checkbox id="test" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('size-4');
    });

    it('should apply small size', () => {
      const { container } = render(<Checkbox id="test" size="sm" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('size-3');
    });

    it('should apply large size', () => {
      const { container } = render(<Checkbox id="test" size="lg" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('size-5');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Checkbox id="test" className="custom-checkbox" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('custom-checkbox');
    });
  });

  describe('Label Association', () => {
    it('should associate label with checkbox via id', () => {
      const { container } = render(<Checkbox id="test-id" label="Test Label" />);
      const labelElement = container.querySelector('label[for="test-id"]');
      expect(labelElement).toBeInTheDocument();
    });

    it('should render label with correct id', () => {
      const { container } = render(<Checkbox id="test-id" label="Test Label" />);
      const labelElement = container.querySelector('#test-id-label');
      expect(labelElement).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('should have data-disabled attribute when disabled', () => {
      const { container } = render(<Checkbox id="test" disabled />);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('data-disabled', 'true');
    });

    it('should have data-checked attribute when checked', () => {
      const { container } = render(<Checkbox id="test" checked />);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('data-checked', 'true');
    });
  });
});
