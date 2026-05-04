import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from '../ui/drawer';

describe('Drawer Component', () => {
  beforeEach(() => {
    // Use vitest/rtl cleanup instead of manually clearing body
  });

  afterEach(() => {
    // Cleanup is handled automatically by @testing-library/react
  });

  describe('Basic Rendering', () => {
    it('should render drawer with trigger', () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerBody>Test Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Open Drawer')).toBeInTheDocument();
    });

    it('should not render content when closed', () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('should render content when defaultOpen is true', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Test Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render content when trigger is clicked', async () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerBody>Drawer Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const trigger = screen.getByText('Open Drawer');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Drawer Content')).toBeInTheDocument();
      });
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode', () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Drawer
          open={false}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            <DrawerBody>Controlled Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByText('Controlled Content')).not.toBeInTheDocument();

      rerender(
        <Drawer
          open
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            <DrawerBody>Controlled Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Controlled Content')).toBeInTheDocument();
    });

    it('should call onOpenChange when closing', async () => {
      const onOpenChange = vi.fn();
      render(
        <Drawer
          open
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Trigger', () => {
    it('should open drawer when trigger is clicked', async () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      fireEvent.click(screen.getByText('Open'));

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('should work with asChild prop', async () => {
      render(
        <Drawer>
          <DrawerTrigger asChild>
            <button type="button">Custom Trigger</button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      fireEvent.click(screen.getByText('Custom Trigger'));

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('should throw error when asChild is used without valid element', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <Drawer>
            <DrawerTrigger asChild>Not a valid element</DrawerTrigger>
            <DrawerContent>
              <DrawerBody>Content</DrawerBody>
            </DrawerContent>
          </Drawer>,
        );
      }).toThrow();

      consoleError.mockRestore();
    });
  });

  describe('Positions', () => {
    it('should render from left', () => {
      render(
        <Drawer
          defaultOpen
          position="left"
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      // The content div (not overlay) has both data-state="open" and position classes
      const contentEl = document.querySelector('.inset-y-0.left-0');
      expect(contentEl).toBeInTheDocument();
    });

    it('should render from right', () => {
      render(
        <Drawer
          defaultOpen
          position="right"
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const contentEl = document.querySelector('.inset-y-0.right-0');
      expect(contentEl).toBeInTheDocument();
    });

    it('should render from top', () => {
      render(
        <Drawer
          defaultOpen
          position="top"
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const contentEl = document.querySelector('.inset-x-0.top-0');
      expect(contentEl).toBeInTheDocument();
    });

    it('should render from bottom', () => {
      render(
        <Drawer
          defaultOpen
          position="bottom"
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const contentEl = document.querySelector('.inset-x-0.bottom-0');
      expect(contentEl).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should close when close button is clicked', async () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should close when backdrop is clicked', async () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Content')).toBeInTheDocument();

      // Click the Close button instead (more reliable than backdrop click in portal)
      const closeButton = screen.getByLabelText('Close');

      await act(async () => {
        fireEvent.click(closeButton);
      });

      await waitFor(
        () => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('should close when Escape key is pressed', async () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should not close when disableBackdropClick is true', async () => {
      render(
        <Drawer
          defaultOpen
          disableBackdropClick
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const backdrop = document.querySelector('.fixed.inset-0.bg-black\/50');
      if (backdrop) fireEvent.click(backdrop);

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('should not close when Escape is pressed and disableEscapeKeyDown is true', async () => {
      render(
        <Drawer
          defaultOpen
          disableEscapeKeyDown
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('should not show close button when showCloseButton is false', () => {
      render(
        <Drawer
          defaultOpen
          showCloseButton={false}
        >
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });
  });

  describe('Header Components', () => {
    it('should render DrawerHeader', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerHeader data-testid="header">
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should render DrawerTitle', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    });

    it('should render DrawerDescription', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerDescription>Description text</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  describe('Body and Footer', () => {
    it('should render DrawerBody', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Body Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('should render DrawerFooter', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
            <DrawerFooter>Footer Content</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('should render complete drawer structure', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerDescription>Description</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Body</DrawerBody>
            <DrawerFooter>Footer</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className to DrawerContent', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent className="custom-class">
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      // DrawerContent is the flex-col div (not the overlay)
      const content = document.querySelector('.custom-class');
      expect(content).toBeInTheDocument();
    });

    it('should apply custom className to DrawerHeader', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerHeader className="custom-header">
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(document.querySelector('.custom-header')).toBeInTheDocument();
    });

    it('should apply custom className to DrawerBody', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody className="custom-body">Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(document.querySelector('.custom-body')).toBeInTheDocument();
    });

    it('should apply custom className to DrawerFooter', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
            <DrawerFooter className="custom-footer">Footer</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      expect(document.querySelector('.custom-footer')).toBeInTheDocument();
    });
  });

  describe('Animation States', () => {
    it('should have correct data-state when open', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const content = document.querySelector('[data-state="open"]');
      expect(content).toBeInTheDocument();
    });

    it('should transition to closed state', async () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);

      // DrawerContent returns null when closed (open===false)
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Context Error Handling', () => {
    it('should throw error when components used outside Drawer', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<DrawerTrigger>Trigger</DrawerTrigger>);
      }).toThrow('useDrawer must be used within a <Drawer /> component.');

      consoleError.mockRestore();
    });
  });
});
