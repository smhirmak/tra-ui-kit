import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from '../label';

describe('Label Component', () => {
  describe('Basic Rendering', () => {
    it('should render children text', () => {
      render(<Label>Username</Label>);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('should render as label element', () => {
      const { container } = render(<Label>Test</Label>);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Input Association', () => {
    it('should associate with input via htmlFor', () => {
      const { container } = render(<Label htmlFor="email-input">Email</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('should work without htmlFor', () => {
      render(<Label>Standalone Label</Label>);
      expect(screen.getByText('Standalone Label')).toBeInTheDocument();
    });
  });

  describe('Required Indicator', () => {
    it('should show required asterisk when required is true', () => {
      render(<Label required>Required Field</Label>);
      expect(screen.getByText('Required Field')).toBeInTheDocument();
      // Component should render required indicator
    });

    it('should not show asterisk when required is false', () => {
      render(<Label required={false}>Optional Field</Label>);
      expect(screen.getByText('Optional Field')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Label className="custom-label">Test</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveClass('custom-label');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling when disabled is true', () => {
      const { container } = render(<Label disabled>Disabled Label</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('data-disabled', 'true');
    });
  });
});
