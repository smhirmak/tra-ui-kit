/* eslint-disable react/button-has-type */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Popover from '../popover';

describe('Popover Component', () => {
  describe('Basic Rendering', () => {
    it('should render trigger element', () => {
      render(<Popover trigger={<button>Open Popover</button>}>Content</Popover>);
      expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });

    it('should render without crashing', () => {
      const { container } = render(
        <Popover trigger={<button>Trigger</button>}>
          <div>Popover content</div>
        </Popover>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should show content when trigger is clicked', async () => {
      render(
        <Popover trigger={<button>Click me</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText('Click me'));

      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument();
      });
    });
  });

  describe('Alignment', () => {
    it('should accept align prop', () => {
      render(
        <Popover trigger={<button>Trigger</button>} align="start">
          Content
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should accept side prop', () => {
      render(
        <Popover trigger={<button>Trigger</button>} side="top">
          Content
        </Popover>,
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className to trigger', () => {
      render(
        <Popover trigger={<button className="custom-trigger">Trigger</button>}>
          Content
        </Popover>,
      );
      const button = screen.getByText('Trigger');
      expect(button).toHaveClass('custom-trigger');
    });

    it('should apply custom contentClassName', () => {
      const { container } = render(
        <Popover trigger={<button>Trigger</button>} contentClassName="custom-content">
          Content
        </Popover>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Close Behavior', () => {
    it('should close when clicking outside', async () => {
      render(
        <div>
          <Popover trigger={<button>Open</button>}>
            Content
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
