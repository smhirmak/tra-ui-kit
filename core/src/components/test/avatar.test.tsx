import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from '../ui/avatar';

describe('Avatar Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with title initials', () => {
      render(<Avatar title="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render with single title initial', () => {
      render(<Avatar title="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should render with image', () => {
      const { container } = render(<Avatar src="https://example.com/avatar.jpg" />);
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('should render with custom icon', () => {
      render(<Avatar icon={<span data-testid="custom-icon">🎭</span>} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply circular variant', () => {
      const { container } = render(<Avatar variant="circular" />);
      expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('should apply rounded variant', () => {
      const { container } = render(<Avatar variant="rounded" />);
      expect(container.firstChild).toHaveClass('rounded-lg');
    });
  });

  describe('Sizes', () => {
    it('should apply small size', () => {
      const { container } = render(<Avatar size="sm" />);
      expect(container.firstChild).toHaveClass('size-12');
    });

    it('should apply large size', () => {
      const { container } = render(<Avatar size="lg" />);
      expect(container.firstChild).toHaveClass('size-52');
    });
  });

  describe('Badge', () => {
    it('should render with badge', () => {
      render(<Avatar badgeContent="5" />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should apply badge position', () => {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ];

      positions.forEach((position) => {
        const { container } = render(
          <Avatar
            badgeContent="1"
            badgePosition={position}
          />,
        );
        expect(container.querySelector('.absolute')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      const { container } = render(<Avatar onClick={handleClick} />);
      const avatar = container.firstChild as HTMLElement;
      fireEvent.click(avatar);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not render as button when onClick is not provided', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Avatar className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should apply custom badge className', () => {
      render(
        <Avatar
          badgeContent="1"
          badgeClassName="custom-badge"
        />,
      );
      const badge = screen.getByText('1').closest('.absolute');
      expect(badge).toHaveClass('custom-badge');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { container } = render(<Avatar title="" />);
      // Should render default icon when title is empty
      const svgIcon = container.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
    });

    it('should prioritize src over title', () => {
      const { container } = render(
        <Avatar
          src="https://example.com/avatar.jpg"
          title="John Doe"
        />,
      );
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
    });

    it('should render icon when only icon provided', () => {
      render(<Avatar icon={<span data-testid="custom-icon">🎭</span>} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });
});
