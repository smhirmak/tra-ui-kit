import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react';
import Loader, { loaderRef } from '../loader';

describe('Loader', () => {
  beforeEach(() => {
    // Clean up body classes before each test
    document.body.className = '';
  });

  afterEach(() => {
    // Clean up body classes after each test
    document.body.className = '';
  });

  describe('Rendering', () => {
    it('should not render loader initially', () => {
      const { container } = render(<Loader />);
      expect(container.querySelector('.fixed')).not.toBeInTheDocument();
    });

    it('should render circular loader when counter is incremented', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
      });
    });

    it('should render linear loader when variant is linear', async () => {
      const { container } = render(<Loader variant="linear" />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
        expect(container.querySelector('.animate-linear-loader')).toBeInTheDocument();
      });
    });
  });

  describe('Ref Control', () => {
    it('should increment loader counter using ref', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });
    });

    it('should decrement loader counter using ref', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });

      act(() => {
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).not.toBeInTheDocument();
      });
    });

    it('should handle multiple increments', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
        loaderRef.current?.incLoader();
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });

      // Decrement once, should still show loader
      act(() => {
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });

      // Decrement remaining times
      act(() => {
        loaderRef.current?.decLoader();
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).not.toBeInTheDocument();
      });
    });

    it('should not render loader when counter is 0', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).not.toBeInTheDocument();
      });
    });
  });

  describe('Scroll Control', () => {
    it('should disable scroll when loader is shown by default', async () => {
      render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        // Loader sets document.body.style.overflow = 'hidden' (inline style, not class)
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    it('should enable scroll when loader is hidden', async () => {
      render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      act(() => {
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        // When counter reaches 0, overflow is set to 'auto'
        expect(document.body.style.overflow).toBe('auto');
      });
    });

    it('should allow scroll when enableScroll is true', async () => {
      render(<Loader enableScroll />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        // enableScroll=true keeps overflow as auto
        expect(document.body.style.overflow).toBe('auto');
      });
    });

    it('should remove overflow-auto class when loader is hidden', async () => {
      render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      act(() => {
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('auto');
      });
    });
  });

  describe('Variants', () => {
    it('should render circular variant by default', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
      });
    });

    it('should render linear variant when specified', async () => {
      const { container } = render(<Loader variant="linear" />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.animate-linear-loader')).toBeInTheDocument();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className to circular loader', async () => {
      const { container } = render(<Loader className="custom-spinner" />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const spinner = container.querySelector('.custom-spinner');
        expect(spinner).toBeInTheDocument();
      });
    });

    it('should apply custom linearItemClassName to linear loader', async () => {
      const { container } = render(
        <Loader
          variant="linear"
          linearItemClassName="custom-linear-item"
        />,
      );

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const linearItem = container.querySelector('.custom-linear-item');
        expect(linearItem).toBeInTheDocument();
      });
    });

    it('should apply className to linearContainer for linear variant', async () => {
      const { container } = render(
        <Loader
          variant="linear"
          className="custom-container"
        />,
      );

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const linearContainer = container.querySelector('.custom-container');
        expect(linearContainer).toBeInTheDocument();
      });
    });
  });

  describe('Backdrop', () => {
    it('should render backdrop with brightness filter for circular variant', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const backdrop = container.querySelector('.backdrop-brightness-50');
        expect(backdrop).toBeInTheDocument();
      });
    });

    it('should render backdrop with brightness filter for linear variant', async () => {
      const { container } = render(<Loader variant="linear" />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const backdrop = container.querySelector('.backdrop-brightness-50');
        expect(backdrop).toBeInTheDocument();
      });
    });
  });

  describe('Z-Index', () => {
    it('should have high z-index for overlay', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const overlay = container.querySelector('.z-9999');
        expect(overlay).toBeInTheDocument();
      });
    });
  });

  describe('Layout', () => {
    it('should center circular loader on screen', async () => {
      const { container } = render(<Loader />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const overlay = container.querySelector('.fixed.left-0.top-0');
        expect(overlay).toHaveClass('flex', 'items-center', 'justify-center');
      });
    });

    it('should position linear loader at top of screen', async () => {
      const { container } = render(<Loader variant="linear" />);

      act(() => {
        loaderRef.current?.incLoader();
      });

      await waitFor(() => {
        const overlay = container.querySelector('.fixed.left-0.top-0');
        expect(overlay).toHaveClass('h-screen', 'w-screen');
      });
    });
  });

  describe('Counter Edge Cases', () => {
    it('should handle negative counter gracefully', async () => {
      const { container } = render(<Loader />);

      // Decrement without increment
      act(() => {
        loaderRef.current?.decLoader();
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).not.toBeInTheDocument();
      });
    });

    it('should maintain loader visibility with high counter values', async () => {
      const { container } = render(<Loader />);

      act(() => {
        for (let i = 0; i < 100; i++) {
          loaderRef.current?.incLoader();
        }
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });

      // Decrement many times but not all
      act(() => {
        for (let i = 0; i < 50; i++) {
          loaderRef.current?.decLoader();
        }
      });

      await waitFor(() => {
        expect(container.querySelector('.fixed')).toBeInTheDocument();
      });
    });
  });
});
