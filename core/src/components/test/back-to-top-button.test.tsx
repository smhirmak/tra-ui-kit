import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BackToTopButton from '../ui/back-to-top-button';

describe('BackToTopButton Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility', () => {
    it('should be hidden initially (returns null when not visible)', () => {
      const { container } = render(<BackToTopButton />);
      // Component returns null when not visible (scrollY < threshold)
      expect(container.firstChild).toBeNull();
    });

    it('should become visible when scrolled down', () => {
      render(<BackToTopButton />);

      // Simulate scroll past threshold
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);

      const button = screen.getByLabelText('Back to top');
      expect(button).toBeInTheDocument();
    });

    it('should hide when scrolled back to top', () => {
      render(<BackToTopButton />);

      // Scroll down
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);

      // Scroll back up
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);

      // Component returns null again
      expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument();
    });
  });

  describe('Functionality', () => {
    it('should scroll to top when clicked', () => {
      render(<BackToTopButton />);

      // Make button visible
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);

      const button = screen.getByLabelText('Back to top');
      fireEvent.click(button);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  describe('Custom Props', () => {
    it('should render with custom icon', () => {
      render(<BackToTopButton icon={<span data-testid="custom-icon">↑</span>} />);
      // make visible
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should apply custom button className', () => {
      render(<BackToTopButton buttonClassName="custom-button-class" />);
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);
      const button = screen.getByLabelText('Back to top');
      expect(button).toHaveClass('custom-button-class');
    });

    it('should apply custom container className', () => {
      const { container } = render(<BackToTopButton containerClassName="custom-container" />);
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);
      expect(container.firstChild).toHaveClass('custom-container');
    });

    it('should apply custom icon className', () => {
      render(<BackToTopButton iconClassName="custom-icon-class" />);
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);
      const icon = screen.getByLabelText('Back to top').querySelector('svg');
      expect(icon).toHaveClass('custom-icon-class');
    });
  });

  describe('Cleanup', () => {
    it('should remove scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<BackToTopButton />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
});
