import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '../ui/radio-buttons';

describe('Radio Button Components', () => {
  describe('RadioGroup', () => {
    it('should render children', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
        </RadioGroup>,
      );
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <RadioGroup className="custom-group">
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
        </RadioGroup>,
      );
      expect(container.firstChild).toHaveClass('custom-group');
    });

    it('should set default value', () => {
      const { container } = render(
        <RadioGroup defaultValue="2">
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
          <RadioGroupItem
            id="option2"
            value="2"
            label="Option 2"
          />
        </RadioGroup>,
      );

      const radio2 = container.querySelector('#option2') as HTMLInputElement;
      expect(radio2?.checked).toBe(true);
    });

    it('should call onChange when selection changes', () => {
      const handleChange = vi.fn();
      render(
        <RadioGroup onChange={handleChange}>
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
          <RadioGroupItem
            id="option2"
            value="2"
            label="Option 2"
          />
        </RadioGroup>,
      );

      const label = screen.getByLabelText('Option 2');
      fireEvent.click(label);

      expect(handleChange).toHaveBeenCalledWith('2');
    });
  });

  describe('RadioGroupItem', () => {
    it('should render with label', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            label="Test Label"
          />
        </RadioGroup>,
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render without label', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
          />
        </RadioGroup>,
      );
      const input = container.querySelector('#test-radio');
      expect(input).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            label="Test"
            disabled
          />
        </RadioGroup>,
      );
      const input = container.querySelector('#test-radio') as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });

    it('should apply disabled styling', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            label="Test"
            disabled
          />
        </RadioGroup>,
      );
      const label = container.querySelector('label[for="test-radio"]');
      expect(label).toHaveAttribute('data-disabled', 'true');
    });

    it('should be checked when checked prop is true', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            label="Test"
            checked
          />
        </RadioGroup>,
      );
      const input = container.querySelector('#test-radio') as HTMLInputElement;
      expect(input?.checked).toBe(true);
    });

    it('should apply checked styling', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            label="Test"
            checked
          />
        </RadioGroup>,
      );
      const label = container.querySelector('label[for="test-radio"]');
      expect(label).toHaveAttribute('data-checked', 'true');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
            className="custom-radio"
          />
        </RadioGroup>,
      );
      const label = container.querySelector('label[for="test-radio"]');
      expect(label).toHaveClass('custom-radio');
    });

    it('should change selection on click', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
          <RadioGroupItem
            id="option2"
            value="2"
            label="Option 2"
          />
        </RadioGroup>,
      );

      const label1 = screen.getByLabelText('Option 1');
      fireEvent.click(label1);

      const input1 = container.querySelector('#option1') as HTMLInputElement;
      expect(input1?.checked).toBe(true);
    });

    it('should throw error when used outside RadioGroup', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <RadioGroupItem
            id="test"
            value="test"
          />,
        );
      }).toThrow('RadioGroupItem component must be used within a RadioGroup component');

      consoleSpy.mockRestore();
    });
  });

  describe('Multiple Items', () => {
    it('should render multiple radio items', () => {
      render(
        <RadioGroup>
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
          />
          <RadioGroupItem
            id="option2"
            value="2"
            label="Option 2"
          />
          <RadioGroupItem
            id="option3"
            value="3"
            label="Option 3"
          />
        </RadioGroup>,
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should allow only one selection at a time', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="option1"
            value="1"
            label="Option 1"
            name="test-group"
          />
          <RadioGroupItem
            id="option2"
            value="2"
            label="Option 2"
            name="test-group"
          />
        </RadioGroup>,
      );

      const label1 = screen.getByLabelText('Option 1');
      const label2 = screen.getByLabelText('Option 2');

      fireEvent.click(label1);
      const input1First = container.querySelector('#option1') as HTMLInputElement;
      expect(input1First?.checked).toBe(true);

      fireEvent.click(label2);
      const input1Second = container.querySelector('#option1') as HTMLInputElement;
      const input2 = container.querySelector('#option2') as HTMLInputElement;
      expect(input1Second?.checked).toBe(false);
      expect(input2?.checked).toBe(true);
    });
  });

  describe('Base Classes', () => {
    it('should have base radio button classes', () => {
      const { container } = render(
        <RadioGroup>
          <RadioGroupItem
            id="test-radio"
            value="test"
          />
        </RadioGroup>,
      );
      const label = container.querySelector('label[for="test-radio"]');
      expect(label).toHaveClass('rounded-full', 'border-[1.5px]', 'aspect-square', 'size-5');
    });
  });
});
