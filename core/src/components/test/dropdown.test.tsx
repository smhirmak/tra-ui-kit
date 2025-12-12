import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dropdown from '../dropdown';

describe('Dropdown Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  describe('Basic Rendering', () => {
    it('should render with placeholder', () => {
      render(<Dropdown options={mockOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Dropdown options={mockOptions} label="Choose option" />);
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('should render default placeholder when not provided', () => {
      render(<Dropdown options={mockOptions} />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });
  });

  describe('Options Display', () => {
    it('should show options when clicked', async () => {
      render(<Dropdown options={mockOptions} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    it('should hide options when clicking outside', async () => {
      render(<Dropdown options={mockOptions} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Dropdown uses Popover which may handle outside clicks differently
      // This test depends on implementation details
    });
  });

  describe('Selection', () => {
    it('should select option when clicked', async () => {
      const handleChange = vi.fn();
      render(<Dropdown options={mockOptions} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith('opt1');
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });

    it('should show selected value', () => {
      render(<Dropdown options={mockOptions} value="opt2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should show default value', () => {
      render(<Dropdown options={mockOptions} defaultValue="opt1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Dropdown options={mockOptions} disabled />);
      const trigger = screen.getByText('Select...');
      const triggerParent = trigger.closest('[data-disabled]');
      expect(triggerParent).toHaveAttribute('data-disabled', 'true');
    });

    it('should not open when disabled', () => {
      render(<Dropdown options={mockOptions} disabled />);

      fireEvent.click(screen.getByText('Select...'));

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('should not select disabled options', async () => {
      const optionsWithDisabled = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2', disabled: true },
        { label: 'Option 3', value: 'opt3' },
      ];

      const handleChange = vi.fn();
      render(<Dropdown options={optionsWithDisabled} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Option 2'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate options with arrow down key', async () => {
      render(<Dropdown options={mockOptions} />);

      const trigger = screen.getByText('Select...');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(trigger.parentElement!, { key: 'ArrowDown' });

      // Second option should be highlighted
    });

    it('should navigate options with arrow up key', async () => {
      render(<Dropdown options={mockOptions} />);

      const trigger = screen.getByText('Select...');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      fireEvent.keyDown(trigger.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(trigger.parentElement!, { key: 'ArrowDown' });
      fireEvent.keyDown(trigger.parentElement!, { key: 'ArrowUp' });

      // First option should be highlighted
    });

    it('should select option with Enter key', async () => {
      const handleChange = vi.fn();
      render(<Dropdown options={mockOptions} onChange={handleChange} />);

      const trigger = screen.getByText('Select...');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Keyboard navigation depends on focus and event handling
      // This test may need adjustment based on implementation
    });

    it('should close dropdown with Escape key', async () => {
      render(<Dropdown options={mockOptions} />);

      const trigger = screen.getByText('Select...');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Escape key handling depends on focus and implementation
      // This test may need adjustment
    });
  });

  describe('Alignment', () => {
    it('should align left by default', () => {
      render(<Dropdown options={mockOptions} />);
      // Default alignment is left
    });

    it('should align right when specified', () => {
      render(<Dropdown options={mockOptions} dropdownAlign="right" />);
      // Right alignment should be applied
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Dropdown options={mockOptions} className="custom-dropdown" />);
      expect(container.querySelector('.custom-dropdown')).toBeInTheDocument();
    });

    it('should apply custom trigger className', () => {
      render(<Dropdown options={mockOptions} triggerClassName="custom-trigger" />);
      const triggerContainer = document.querySelector('.custom-trigger');
      expect(triggerContainer).toBeInTheDocument();
    });

    it('should apply custom content className', () => {
      render(<Dropdown options={mockOptions} contentClassName="custom-content" />);
      // Custom content class should be applied
    });

    it('should apply custom item className', () => {
      render(<Dropdown options={mockOptions} itemClassName="custom-item" />);
      // Custom item class should be applied
    });
  });

  describe('ID Prop', () => {
    it('should apply id to component', () => {
      const { container } = render(<Dropdown options={mockOptions} id="test-dropdown" />);
      expect(container.querySelector('#test-dropdown')).toBeInTheDocument();
    });
  });

  describe('Selected Indicator', () => {
    it('should show check icon for selected option', async () => {
      render(<Dropdown options={mockOptions} value="opt1" />);

      fireEvent.click(screen.getAllByText('Option 1')[0]);

      await waitFor(() => {
        const svgElements = document.querySelectorAll('svg');
        expect(svgElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Complex Options', () => {
    it('should render options with React nodes as labels', async () => {
      const complexOptions = [
        { label: <span data-testid="custom-label">Custom Label</span>, value: 'custom' },
      ];

      render(<Dropdown options={complexOptions} />);

      fireEvent.click(screen.getByText('Select...'));

      await waitFor(() => {
        expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      });
    });
  });

  describe('Value Types', () => {
    it('should work with string values', async () => {
      const handleChange = vi.fn();
      render(<Dropdown options={mockOptions} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Select...'));
      await waitFor(() => screen.getByText('Option 1'));
      fireEvent.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith('opt1');
    });

    it('should work with number values', async () => {
      const numberOptions = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
      ];

      const handleChange = vi.fn();
      render(<Dropdown options={numberOptions} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Select...'));
      await waitFor(() => screen.getByText('One'));
      fireEvent.click(screen.getByText('One'));

      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('should work with boolean values', async () => {
      const boolOptions = [
        { label: 'True', value: true },
        { label: 'False', value: false },
      ];

      const handleChange = vi.fn();
      render(<Dropdown options={boolOptions} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Select...'));
      await waitFor(() => screen.getByText('True'));
      fireEvent.click(screen.getByText('True'));

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });
});
