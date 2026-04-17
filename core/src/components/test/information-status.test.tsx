import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InformationStatus from '../information-status';

describe('InformationStatus Component', () => {
  describe('Basic Rendering', () => {
    it('should render with title', () => {
      render(<InformationStatus title="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render success type by default', () => {
      const { container } = render(<InformationStatus title="Success" />);
      expect(container.firstChild).toHaveClass('bg-success-light', 'text-success');
    });
  });

  describe('Type Variants', () => {
    it('should apply success type styling', () => {
      const { container } = render(<InformationStatus type="success" title="Success" />);
      expect(container.firstChild).toHaveClass('bg-success-light', 'text-success');
    });

    it('should apply error type styling', () => {
      const { container } = render(<InformationStatus type="error" title="Error" />);
      expect(container.firstChild).toHaveClass('bg-error-light', 'text-error');
    });

    it('should apply warning type styling', () => {
      const { container } = render(<InformationStatus type="warning" title="Warning" />);
      expect(container.firstChild).toHaveClass('bg-warning-light', 'text-warning');
    });
  });

  describe('Icons', () => {
    it('should not render icon by default', () => {
      const { container } = render(<InformationStatus title="Test" />);
      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });

    it('should render icon when isHaveIcon is true', () => {
      const { container } = render(<InformationStatus title="Test" isHaveIcon />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render custom icon', () => {
      render(
        <InformationStatus
          title="Test"
          icon={<span data-testid="custom-icon">⚠️</span>}
        />,
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render success icon when type is success', () => {
      const { container } = render(<InformationStatus type="success" title="Test" isHaveIcon />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render error icon when type is error', () => {
      const { container } = render(<InformationStatus type="error" title="Test" isHaveIcon />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render warning icon when type is warning', () => {
      const { container } = render(<InformationStatus type="warning" title="Test" isHaveIcon />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<InformationStatus title="Test" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Base Classes', () => {
    it('should have base styling classes', () => {
      const { container } = render(<InformationStatus title="Test" />);
      expect(container.firstChild).toHaveClass(
        'flex',
        'w-fit',
        'gap-1',
        'rounded-md',
        'px-4',
        'py-2',
        'text-sm',
        'font-medium',
      );
    });
  });
});
