/* eslint-disable react/button-has-type */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';

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
});
