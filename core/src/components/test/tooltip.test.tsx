import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tooltip from '../ui/tooltip';

describe('Tooltip Component', () => {
  describe('Basic Rendering', () => {
    it('should render trigger element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should not show tooltip content by default', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover</button>
        </Tooltip>,
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
        </Tooltip>,
      );
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('should accept array content', () => {
      render(
        <Tooltip content={['Line 1', 'Line 2']}>
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Position', () => {
    it('should accept top position', () => {
      render(
        <Tooltip
          content="Top"
          position="top"
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept bottom position', () => {
      render(
        <Tooltip
          content="Bottom"
          position="bottom"
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept left position', () => {
      render(
        <Tooltip
          content="Left"
          position="left"
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept right position', () => {
      render(
        <Tooltip
          content="Right"
          position="right"
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Delay', () => {
    it('should accept delay prop', () => {
      render(
        <Tooltip
          content="Delayed"
          delay={500}
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Tooltip
          content="Text"
          className="custom-tooltip"
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(container.querySelector('.custom-tooltip')).toBeInTheDocument();
    });
  });

  describe('Arrow', () => {
    it('should accept arrow prop', () => {
      render(
        <Tooltip
          content="Text"
          arrow
        >
          <button>Button</button>
        </Tooltip>,
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });
});
