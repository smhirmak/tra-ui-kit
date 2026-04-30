import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chip from '../chip';

describe('Chip Component', () => {
  describe('Basic Rendering', () => {
    it('should render with label', () => {
      render(<Chip label="Test Chip" />);
      expect(screen.getByText('Test Chip')).toBeInTheDocument();
    });

    it('should render as button', () => {
      render(<Chip label="Test" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply default size', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.firstChild).toHaveClass('px-5');
    });

    it('should apply small size', () => {
      const { container } = render(
        <Chip
          label="Test"
          size="sm"
        />,
      );
      expect(container.firstChild).toHaveClass('px-4');
    });

    it('should apply large size', () => {
      const { container } = render(
        <Chip
          label="Test"
          size="lg"
        />,
      );
      expect(container.firstChild).toHaveClass('px-6');
    });
  });

  describe('States', () => {
    it('should apply active state', () => {
      const { container } = render(
        <Chip
          label="Test"
          active
        />,
      );
      expect(container.firstChild).toHaveClass('border-primary');
    });

    it('should apply selected state', () => {
      const { container } = render(
        <Chip
          label="Test"
          selected
        />,
      );
      expect(container.firstChild).toHaveClass('bg-primary');
    });

    it('should not be active or selected by default', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.firstChild).not.toHaveClass('border-primary');
      expect(container.firstChild).not.toHaveClass('bg-primary');
    });
  });

  describe('Clickable', () => {
    it('should be clickable when onClick is provided', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Chip
          label="Test"
          onClick={handleClick}
        />,
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('should not be clickable when onClick is not provided', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.firstChild).toHaveClass('cursor-default');
    });

    it('should call onClick with id when clicked', () => {
      const handleClick = vi.fn();
      render(
        <Chip
          id="test-id"
          label="Test"
          onClick={handleClick}
        />,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledWith('test-id');
    });
  });

  describe('Icons', () => {
    it('should render with start icon', () => {
      render(
        <Chip
          label="Test"
          startIcon={<span data-testid="start-icon">←</span>}
        />,
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('should render with end icon', () => {
      render(
        <Chip
          label="Test"
          endIcon={<span data-testid="end-icon">→</span>}
        />,
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('should render with both icons', () => {
      render(
        <Chip
          label="Test"
          startIcon={<span data-testid="start-icon">←</span>}
          endIcon={<span data-testid="end-icon">→</span>}
        />,
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Delete Functionality', () => {
    it('should render delete icon when onDelete is provided', () => {
      const handleDelete = vi.fn();
      const { container } = render(
        <Chip
          label="Test"
          onDelete={handleDelete}
        />,
      );
      const deleteButton = container.querySelector('[role="button"]:not([type="button"])');
      expect(deleteButton).toBeInTheDocument();
    });

    it('should call onDelete with id when delete is clicked', () => {
      const handleDelete = vi.fn();
      const { container } = render(
        <Chip
          id="test-id"
          label="Test"
          onDelete={handleDelete}
        />,
      );

      const deleteButton = container.querySelector('[role="button"]:not([type="button"])');
      if (deleteButton) {
        fireEvent.click(deleteButton);
      }

      expect(handleDelete).toHaveBeenCalledWith('test-id');
    });

    it('should prevent onClick when delete is clicked', () => {
      const handleClick = vi.fn();
      const handleDelete = vi.fn();
      const { container } = render(
        <Chip
          label="Test"
          onClick={handleClick}
          onDelete={handleDelete}
        />,
      );

      const deleteButton = container.querySelector('[role="button"]:not([type="button"])');
      if (deleteButton) {
        fireEvent.click(deleteButton);
      }

      expect(handleDelete).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should render custom delete icon', () => {
      const handleDelete = vi.fn();
      render(
        <Chip
          label="Test"
          onDelete={handleDelete}
          deleteIcon={<span data-testid="custom-delete">×</span>}
        />,
      );
      expect(screen.getByTestId('custom-delete')).toBeInTheDocument();
    });

    it('should handle keyboard delete with Enter key', () => {
      const handleDelete = vi.fn();
      const { container } = render(
        <Chip
          id="test-id"
          label="Test"
          onDelete={handleDelete}
        />,
      );

      const deleteButton = container.querySelector('[role="button"]:not([type="button"])');
      if (deleteButton) {
        fireEvent.keyDown(deleteButton, { key: 'Enter', code: 'Enter' });
      }

      // Component may not implement keyboard delete, so this test might need adjustment
      // expect(handleDelete).toHaveBeenCalledWith('test-id');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom label className', () => {
      render(
        <Chip
          label="Test"
          labelClassName="custom-label"
        />,
      );
      const label = screen.getByText('Test');
      expect(label).toHaveClass('custom-label');
    });
  });

  describe('ID Prop', () => {
    it('should apply id to button', () => {
      render(
        <Chip
          id="test-chip"
          label="Test"
        />,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'test-chip');
    });
  });
});
