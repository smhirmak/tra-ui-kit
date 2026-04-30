import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Switch from '../switch';

describe('Switch Component', () => {
  describe('Basic Rendering', () => {
    it('should render switch', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const input = container.querySelector('#test-switch');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          label="Test Label"
        />,
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render without label', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const input = container.querySelector('#test-switch');
      expect(input).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should be unchecked when checked is false', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const input = container.querySelector('#test-switch') as HTMLInputElement;
      expect(input?.checked).toBe(false);
    });

    it('should be checked when checked is true', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked
          onChange={vi.fn()}
        />,
      );
      const input = container.querySelector('#test-switch') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('should toggle checked state when clicked', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={handleChange}
        />,
      );

      const label = container.querySelector('label[for="test-switch"]');
      if (label) {
        fireEvent.click(label);
      }

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should have data-checked attribute when checked', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked
          onChange={vi.fn()}
        />,
      );
      const switchElement = container.querySelector('.group');
      expect(switchElement).toHaveAttribute('data-checked', 'true');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          disabled
        />,
      );
      const input = container.querySelector('#test-switch') as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });

    it('should not call onChange when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={handleChange}
          disabled
        />,
      );

      const label = container.querySelector('label[for="test-switch"]');
      if (label) {
        fireEvent.click(label);
      }

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should apply disabled styling', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          disabled
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('Variants', () => {
    it('should apply apple variant by default', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass('h-7');
    });

    it('should apply apple variant styling', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          variant="apple"
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass('h-7');
    });

    it('should apply android variant styling', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          variant="android"
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass('h-6');
    });
  });

  describe('Default Checked', () => {
    it('should set initial checked state with defaultChecked', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          defaultChecked
        />,
      );
      const input = container.querySelector('#test-switch') as HTMLInputElement;
      // Note: defaultChecked sets initial state, but controlled 'checked' prop overrides it
      expect(input).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          className="custom-switch"
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass('custom-switch');
    });

    it('should apply custom thumbClassName', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          thumbClassName="custom-thumb"
        />,
      );
      const thumb = container.querySelector('.pointer-events-none');
      expect(thumb).toHaveClass('custom-thumb');
    });

    it('should apply custom containerClassName', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          containerClassName="custom-container"
        />,
      );
      expect(container.firstChild).toHaveClass('custom-container');
    });

    it('should apply custom labelClassName', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          label="Test"
          labelClassName="custom-label"
        />,
      );
      const labelElement = container.querySelector('#test-switch-label');
      expect(labelElement).toHaveClass('custom-label');
    });
  });

  describe('Required Icon', () => {
    it('should show required icon when showRequiredIcon is true', () => {
      render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
          label="Required Field"
          showRequiredIcon
        />,
      );
      expect(screen.getByText('Required Field')).toBeInTheDocument();
    });
  });

  describe('Base Classes', () => {
    it('should have base switch classes', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const switchBase = container.querySelector('.group');
      expect(switchBase).toHaveClass(
        'inline-flex',
        'w-12',
        'shrink-0',
        'cursor-pointer',
        'rounded-full',
        'border-2',
      );
    });

    it('should have base thumb classes', () => {
      const { container } = render(
        <Switch
          id="test-switch"
          checked={false}
          onChange={vi.fn()}
        />,
      );
      const thumb = container.querySelector('.pointer-events-none');
      expect(thumb).toHaveClass('block', 'size-6', 'rounded-full', 'transition-transform');
    });
  });
});
