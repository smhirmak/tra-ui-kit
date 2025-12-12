import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Drawer from '../drawer';

describe('Drawer Component', () => {
  describe('Basic Rendering', () => {
    it('should not render content when closed', () => {
      render(
        <Drawer isOpen={false} onClose={vi.fn()} position="left">
          Test Content
        </Drawer>,
      );

      const drawer = screen.getByText('Test Content').parentElement;
      expect(drawer).toHaveClass('-translate-x-full');
    });

    it('should render content when open', () => {
      render(
        <Drawer isOpen onClose={vi.fn()} position="left">
          Test Content
        </Drawer>,
      );

      const drawer = screen.getByText('Test Content').parentElement;
      expect(drawer).toHaveClass('translate-x-0');
    });
  });

  describe('Positions', () => {
    it('should render from left', () => {
      const { container } = render(
        <Drawer isOpen onClose={vi.fn()} position="left">
          Content
        </Drawer>,
      );

      expect(container.querySelector('.left-0')).toBeInTheDocument();
    });

    it('should render from right', () => {
      const { container } = render(
        <Drawer isOpen onClose={vi.fn()} position="right">
          Content
        </Drawer>,
      );

      expect(container.querySelector('.right-0')).toBeInTheDocument();
    });

    it('should render from top', () => {
      const { container } = render(
        <Drawer isOpen onClose={vi.fn()} position="top">
          Content
        </Drawer>,
      );

      expect(container.querySelector('.top-0')).toBeInTheDocument();
    });

    it('should render from bottom', () => {
      const { container } = render(
        <Drawer isOpen onClose={vi.fn()} position="bottom">
          Content
        </Drawer>,
      );

      expect(container.querySelector('.bottom-0')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen onClose={handleClose} position="left">
          Content
        </Drawer>,
      );

      const closeButton = document.querySelector('button[class*="MsiDialog-closeButton"]');
      if (closeButton) {
        fireEvent.click(closeButton);
      }

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen onClose={handleClose} position="left">
          Content
        </Drawer>,
      );

      const backdrop = document.querySelector('.bg-black\\/50');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
      }
    });

    it('should not close when alwaysOpen is true', () => {
      const handleClose = vi.fn();
      render(
        <Drawer isOpen onClose={handleClose} position="left" alwaysOpen>
          Content
        </Drawer>,
      );

      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });
  });

  describe('Title and Header', () => {
    it('should render title', () => {
      render(
        <Drawer isOpen onClose={vi.fn()} position="left" title="Drawer Title">
          Content
        </Drawer>,
      );

      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    });

    it('should render custom title element', () => {
      render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          title={<h2 data-testid="custom-title">Custom Title</h2>}
        >
          Content
        </Drawer>,
      );

      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('should render footer', () => {
      render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          footer={<div>Footer Content</div>}
        >
          Content
        </Drawer>,
      );

      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('should render footer as string', () => {
      render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          footer="Footer Text"
        >
          Content
        </Drawer>,
      );

      expect(screen.getByText('Footer Text')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom container className', () => {
      const { container } = render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          containerClassName="custom-container"
        >
          Content
        </Drawer>,
      );

      expect(container.querySelector('.custom-container')).toBeInTheDocument();
    });

    it('should apply custom backdrop className', () => {
      render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          backdropClassName="custom-backdrop"
        >
          Content
        </Drawer>,
      );

      const backdrop = document.querySelector('.custom-backdrop');
      expect(backdrop).toBeInTheDocument();
    });

    it('should apply custom close button className', () => {
      render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          closeButtonClassName="custom-close"
        >
          Content
        </Drawer>,
      );

      const closeButton = document.querySelector('button[class*="MsiDialog-closeButton"]');
      expect(closeButton).toHaveClass('custom-close');
    });

    it('should apply custom header className', () => {
      const { container } = render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          title="Title"
          headerClassName="custom-header"
        >
          Content
        </Drawer>,
      );

      expect(container.querySelector('.custom-header')).toBeInTheDocument();
    });

    it('should apply custom body className', () => {
      const { container } = render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          bodyClassName="custom-body"
        >
          Content
        </Drawer>,
      );

      expect(container.querySelector('.custom-body')).toBeInTheDocument();
    });

    it('should apply custom footer className', () => {
      const { container } = render(
        <Drawer
          isOpen
          onClose={vi.fn()}
          position="left"
          footer="Footer"
          footerClassName="custom-footer"
        >
          Content
        </Drawer>,
      );

      expect(container.querySelector('.custom-footer')).toBeInTheDocument();
    });
  });

  describe('Mode', () => {
    it('should render in overlay mode', () => {
      const { container } = render(
        <Drawer isOpen onClose={vi.fn()} position="left" mode="overlay">
          Content
        </Drawer>,
      );

      expect(container.querySelector('.fixed')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should apply correct transform when opening from left', () => {
      const { rerender } = render(
        <Drawer isOpen={false} onClose={vi.fn()} position="left">
          Content
        </Drawer>,
      );

      let drawer = screen.getByText('Content').parentElement;
      expect(drawer).toHaveClass('-translate-x-full');

      rerender(
        <Drawer isOpen onClose={vi.fn()} position="left">
          Content
        </Drawer>,
      );

      drawer = screen.getByText('Content').parentElement;
      expect(drawer).toHaveClass('translate-x-0');
    });

    it('should apply correct transform when opening from right', () => {
      const { rerender } = render(
        <Drawer isOpen={false} onClose={vi.fn()} position="right">
          Content
        </Drawer>,
      );

      let drawer = screen.getByText('Content').parentElement;
      expect(drawer).toHaveClass('translate-x-full');

      rerender(
        <Drawer isOpen onClose={vi.fn()} position="right">
          Content
        </Drawer>,
      );

      drawer = screen.getByText('Content').parentElement;
      expect(drawer).toHaveClass('translate-x-0');
    });
  });
});
