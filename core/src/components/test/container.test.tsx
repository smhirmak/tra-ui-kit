import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Container from '../container';

describe('Container Component', () => {
  describe('Basic Rendering', () => {
    it('should render children', () => {
      render(<Container>Test Content</Container>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      const { container } = render(<Container>Test</Container>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('should render as custom element', () => {
      const { container } = render(<Container as="section">Test</Container>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });
  });

  describe('Max Width Variants', () => {
    it('should apply xl max-width by default', () => {
      const { container } = render(<Container>Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-xl)');
    });

    it('should apply xs max-width', () => {
      const { container } = render(<Container maxWidth="xs">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-full');
    });

    it('should apply sm max-width', () => {
      const { container } = render(<Container maxWidth="sm">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-sm)');
    });

    it('should apply md max-width', () => {
      const { container } = render(<Container maxWidth="md">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-md)');
    });

    it('should apply lg max-width', () => {
      const { container } = render(<Container maxWidth="lg">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-lg)');
    });

    it('should apply 2xl max-width', () => {
      const { container } = render(<Container maxWidth="2xl">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-2xl)');
    });

    it('should apply full max-width', () => {
      const { container } = render(<Container maxWidth="full">Test</Container>);
      expect(container.firstChild).toHaveClass('max-w-full');
    });
  });

  describe('Gutters', () => {
    it('should have gutters by default', () => {
      const { container } = render(<Container>Test</Container>);
      expect(container.firstChild).toHaveClass('px-4');
    });

    it('should disable gutters when disableGutters is true', () => {
      const { container } = render(<Container disableGutters>Test</Container>);
      expect(container.firstChild).toHaveClass('px-0');
    });
  });

  describe('Centering', () => {
    it('should not be centered by default', () => {
      const { container } = render(<Container>Test</Container>);
      expect(container.firstChild).not.toHaveClass('flex');
      expect(container.firstChild).not.toHaveClass('items-center');
    });

    it('should center content when centered is true', () => {
      const { container } = render(<Container centered>Test</Container>);
      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).toHaveClass('items-center');
      expect(container.firstChild).toHaveClass('justify-center');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Container className="custom-container">Test</Container>);
      expect(container.firstChild).toHaveClass('custom-container');
    });

    it('should merge custom className with default classes', () => {
      const { container } = render(<Container className="custom-container">Test</Container>);
      expect(container.firstChild).toHaveClass('custom-container');
      expect(container.firstChild).toHaveClass('container');
      expect(container.firstChild).toHaveClass('mx-auto');
    });
  });

  describe('Combined Props', () => {
    it('should work with multiple props together', () => {
      const { container } = render(
        <Container
          maxWidth="md"
          disableGutters
          centered
          className="custom"
        >
          Test
        </Container>,
      );
      expect(container.firstChild).toHaveClass('max-w-(--breakpoint-md)');
      expect(container.firstChild).toHaveClass('px-0');
      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).toHaveClass('items-center');
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('Base Classes', () => {
    it('should always have base container classes', () => {
      const { container } = render(<Container>Test</Container>);
      expect(container.firstChild).toHaveClass('container');
      expect(container.firstChild).toHaveClass('mx-auto');
      expect(container.firstChild).toHaveClass('w-full');
    });
  });
});
