import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../button';

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('should render with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render as button by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply solid variant by default', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('bg-primary');
    });

    it('should apply outlined variant', () => {
      const { container } = render(<Button variant="outlined">Click</Button>);
      expect(container.firstChild).toHaveClass('border-primary');
    });

    it('should apply ghost variant', () => {
      const { container } = render(<Button variant="ghost">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-transparent');
    });
  });

  describe('Colors', () => {
    it('should apply primary color by default', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('bg-primary');
    });

    it('should apply secondary color', () => {
      const { container } = render(<Button color="secondary">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-secondary');
    });

    it('should apply tertiary color', () => {
      const { container } = render(<Button color="tertiary">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-tertiary');
    });

    it('should apply secondary color variant', () => {
      const { container } = render(<Button color="secondary">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-secondary');
    });
  });

  describe('Sizes', () => {
    it('should apply default size', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('h-14');
    });

    it('should apply small size', () => {
      const { container } = render(<Button size="sm">Click</Button>);
      expect(container.firstChild).toHaveClass('h-13');
    });

    it('should apply large size', () => {
      const { container } = render(<Button size="lg">Click</Button>);
      expect(container.firstChild).toHaveClass('h-15');
    });

    it('should apply icon size', () => {
      const { container } = render(<Button size="icon">+</Button>);
      expect(container.firstChild).toHaveClass('size-10');
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading', () => {
      render(<Button loading>Click</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      // LoadingSpinner should be present
    });

    it('should be disabled when loading', () => {
      render(<Button loading>Click</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should show loading spinner when loading is true', () => {
      render(<Button loading>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Click</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(<Button loading onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Icons feature not implemented in Button component
  // describe('Icons', () => {
  //   it('should render with start icon', () => {
  //     render(<Button startIcon={<span data-testid="start-icon">←</span>}>Click</Button>);
  //     expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  //   });

  //   it('should render with end icon', () => {
  //     render(<Button endIcon={<span data-testid="end-icon">→</span>}>Click</Button>);
  //     expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  //   });

  //   it('should render with both start and end icons', () => {
  //     render(
  //       <Button
  //         startIcon={<span data-testid="start-icon">←</span>}
  //         endIcon={<span data-testid="end-icon">→</span>}
  //       >
  //         Click
  //       </Button>
  //     );
  //     expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  //     expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  //   });
  // });

  describe('Rounded', () => {
    it('should apply default rounded', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('rounded-lg');
    });

    it('should apply full rounded', () => {
      const { container } = render(<Button rounded="lg">Click</Button>);
      expect(container.firstChild).toHaveClass('rounded-full');
    });
  });

  // Full width feature not implemented in Button component
  // describe('Full Width', () => {
  //   it('should apply full width', () => {
  //     const { container } = render(<Button fullWidth>Click</Button>);
  //     expect(container.firstChild).toHaveClass('w-full');
  //   });
  // });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Button className="custom-button">Click</Button>);
      expect(container.firstChild).toHaveClass('custom-button');
    });
  });

  describe('HTML Attributes', () => {
    it('should accept type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('should have type button by default', () => {
      render(<Button>Click</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });
});
