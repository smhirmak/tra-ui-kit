import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skeleton from '../ui/skeleton';

describe('Skeleton Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have animation by default', () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });
  });

  describe('Animation', () => {
    it('should show animation when animation is true', () => {
      const { container } = render(<Skeleton animation />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('should not show animation when animation is false', () => {
      const { container } = render(<Skeleton animation={false} />);
      expect(container.firstChild).not.toHaveClass('animate-pulse');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Skeleton className="custom-skeleton" />);
      expect(container.firstChild).toHaveClass('custom-skeleton');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<Skeleton className="size-20" />);
      // size-20 is a Tailwind shorthand (h-20 + w-20) — check the actual class name applied
      expect(container.firstChild).toHaveClass('size-20', 'rounded-md', 'bg-neutral');
    });
  });

  describe('Base Classes', () => {
    it('should have base styling classes', () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass('h-4', 'w-full', 'rounded-md', 'bg-neutral');
    });
  });

  describe('Common Use Cases', () => {
    it('should render circular skeleton', () => {
      const { container } = render(<Skeleton className="size-12 rounded-full" />);
      expect(container.firstChild).toHaveClass('rounded-full', 'size-12');
    });

    it('should render text skeleton', () => {
      const { container } = render(<Skeleton className="h-4 w-3/4" />);
      expect(container.firstChild).toHaveClass('h-4', 'w-3/4');
    });

    it('should render rectangular skeleton', () => {
      const { container } = render(<Skeleton className="h-32 w-full rounded-lg" />);
      expect(container.firstChild).toHaveClass('h-32', 'w-full', 'rounded-lg');
    });
  });
});
