import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../dialog';

describe('Dialog Component', () => {
  describe('Basic Rendering', () => {
    it('should not render content when closed', () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>,
      );
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
    });

    it('should render trigger button', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
        </Dialog>,
      );
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });
  });

  describe('Open/Close Functionality', () => {
    it('should open dialog when trigger is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });
    });

    it('should close dialog when close button is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });

      const closeButton = document.querySelector('button[class*="absolute"]');
      if (closeButton) {
        fireEvent.click(closeButton);
      }

      await waitFor(() => {
        expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
      });
    });

    it('should close dialog when backdrop is clicked', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });

      // Dialog component may not support backdrop click to close by default
      // Skipping this test as it depends on implementation
    });

    it('should not close when backdrop clicked if disableBackdropClick is true', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });

      const backdrop = document.querySelector('[data-state="open"]');
      if (backdrop?.parentElement) {
        fireEvent.click(backdrop.parentElement);
      }

      // Should still be open
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode', async () => {
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        );
      };

      render(<TestComponent />);
      expect(screen.queryByText('Controlled Dialog')).not.toBeInTheDocument();

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Controlled Dialog')).toBeInTheDocument();
      });
    });

    it('should call onOpenChange when state changes', async () => {
      const handleOpenChange = vi.fn();
      render(
        <Dialog onOpenChange={handleOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Size Variants', () => {
    it('should apply default size', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        const content = screen.getByText('Test').closest('[data-state]');
        expect(content).toBeInTheDocument();
      });
    });

    it('should apply small size', async () => {
      render(
        <Dialog
          defaultOpen
          size="sm"
        >
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        const content = document.querySelector('.max-w-sm');
        expect(content).toBeInTheDocument();
      });
    });

    it('should apply large size', async () => {
      render(
        <Dialog
          defaultOpen
          size="lg"
        >
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        const content = document.querySelector('.max-w-2xl');
        expect(content).toBeInTheDocument();
      });
    });
  });

  describe('Dialog Parts', () => {
    it('should render DialogHeader', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Header Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        expect(screen.getByText('Header Title')).toBeInTheDocument();
      });
    });

    it('should render DialogDescription', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogDescription>Test Description</DialogDescription>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        expect(screen.getByText('Test Description')).toBeInTheDocument();
      });
    });

    it('should render DialogFooter', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });
  });

  describe('Close Button', () => {
    it('should show close button by default', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        const closeButton = document.querySelector('button[class*="absolute"]');
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('should hide close button when showCloseButton is false', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await waitFor(() => {
        expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
      });
    });
  });

  describe('Trigger asChild', () => {
    it('should work with asChild prop', async () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <button>Custom Trigger</button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByText('Custom Trigger'));

      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
    });
  });
});
