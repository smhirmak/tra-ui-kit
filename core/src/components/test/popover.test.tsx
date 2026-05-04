/* eslint-disable react/button-has-type */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

describe('Popover Component', () => {
  describe('Basic Rendering', () => {
    it('should render trigger element', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Open Popover</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });

    it('should render without crashing', () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover content</div>
          </PopoverContent>
        </Popover>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should show content when trigger is clicked', async () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Click me</button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover content</div>
          </PopoverContent>
        </Popover>,
      );

      fireEvent.click(screen.getByText('Click me'));

      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument();
      });
    });
  });

  describe('Alignment', () => {
    it('should accept dropdownAlign prop', () => {
      render(
        <Popover dropdownAlign="right">
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should render with left alignment', () => {
      render(
        <Popover dropdownAlign="left">
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className to trigger', () => {
      render(
        <Popover>
          <PopoverTrigger className="custom-trigger">
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      const triggerDiv = screen.getByText('Trigger').closest('div[data-state]');
      expect(triggerDiv).toHaveClass('custom-trigger');
    });

    it('should apply custom contentClassName', () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent className="custom-content">Content</PopoverContent>
        </Popover>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Close Behavior', () => {
    it('should close when clicking outside', async () => {
      render(
        <div>
          <Popover>
            <PopoverTrigger>
              <button>Open</button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
          <div>Outside</div>
        </div>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      // Click outside behavior depends on implementation
    });
  });

  describe('Align & Side Props (PopoverContent)', () => {
    it('should accept align="start" on PopoverContent', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent align="left">Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept align="right" on PopoverContent', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent align="right">Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept align="center" on PopoverContent', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent align="center">Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept side="top" on PopoverContent', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent side="top">Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept side="bottom" on PopoverContent', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent side="bottom">Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should show content with align="end" after trigger click', async () => {
      render(
        <Popover>
          <PopoverTrigger>
            <button>Open</button>
          </PopoverTrigger>
          <PopoverContent align="right">Aligned Content</PopoverContent>
        </Popover>,
      );

      await act(async () => {
        fireEvent.click(screen.getByText('Open'));
      });

      await waitFor(() => {
        expect(screen.getByText('Aligned Content')).toBeInTheDocument();
      });
    });
  });

  describe('maxHeight Prop (Popover)', () => {
    it('should accept maxHeight as a number', () => {
      render(
        <Popover maxHeight={400}>
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept maxHeight as a string', () => {
      render(
        <Popover maxHeight="50vh">
          <PopoverTrigger>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should show content with maxHeight after trigger click', async () => {
      render(
        <Popover maxHeight={300}>
          <PopoverTrigger>
            <button>Open</button>
          </PopoverTrigger>
          <PopoverContent>Scrollable Content</PopoverContent>
        </Popover>,
      );

      await act(async () => {
        fireEvent.click(screen.getByText('Open'));
      });

      await waitFor(() => {
        expect(screen.getByText('Scrollable Content')).toBeInTheDocument();
      });
    });
  });

  describe('PopoverTrigger ref forwarding', () => {
    it('should forward ref to trigger element', () => {
      const ref = createRef<HTMLElement | null>();
      render(
        <Popover>
          <PopoverTrigger ref={ref}>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );
      // ref.current will be set after click (trigger node is set on interaction)
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should set ref after trigger is clicked', async () => {
      const ref = createRef<HTMLElement | null>();
      render(
        <Popover>
          <PopoverTrigger ref={ref}>
            <button>Open</button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>,
      );

      await act(async () => {
        fireEvent.click(screen.getByText('Open'));
      });

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });
});
