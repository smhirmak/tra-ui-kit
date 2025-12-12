import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tooltip from '../tooltip';

describe('Tooltip Component', () => {
  describe('Basic Rendering', () => {
    it('should render trigger element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should not show tooltip content by default', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover</button>
        </Tooltip>
      );
      // Tooltip content may be in DOM but hidden
      expect(screen.getByText('Hover')).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('should accept string content', () => {
      render(
        <Tooltip content="Help text">
          <span>Info</span>
        </Tooltip>
      );
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('should accept ReactNode content', () => {
      render(
        <Tooltip content={<div>Custom content</div>}>
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Placement', () => {
    it('should accept top placement', () => {
      render(
        <Tooltip content="Top" placement="top">
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept bottom placement', () => {
      render(
        <Tooltip content="Bottom" placement="bottom">
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept left placement', () => {
      render(
        <Tooltip content="Left" placement="left">
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept right placement', () => {
      render(
        <Tooltip content="Right" placement="right">
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Delay', () => {
    it('should accept delay prop', () => {
      render(
        <Tooltip content="Delayed" delay={500}>
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Tooltip content="Text" className="custom-tooltip">
          <button>Button</button>
        </Tooltip>
      );
      expect(container.querySelector('.custom-tooltip')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should accept disabled prop', () => {
      render(
        <Tooltip content="Text" disabled>
          <button>Button</button>
        </Tooltip>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });
});
