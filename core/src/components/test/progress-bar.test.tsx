import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../progress-bar';

describe('ProgressBar', () => {
  describe('Rendering', () => {
    it('should render progress bar with default props', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} />,
      );
      expect(container.querySelector('.MsiProgressBar-container')).toBeInTheDocument();
      expect(container.querySelector('.MsiProgressBar-linearContainer')).toBeInTheDocument();
      expect(container.querySelector('.MsiProgressBar-linearProgress')).toBeInTheDocument();
    });

    it('should render progress title when provided', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} progressTitle="Loading..." />,
      );
      expect(container.querySelector('.MsiProgressBar-title')).toHaveTextContent('Loading...');
    });

    it('should render step text with number value type by default', () => {
      const { container } = render(
        <ProgressBar currentStep={3} totalStepSize={10} />,
      );
      expect(container.querySelector('.MsiProgressBar-stepText')).toHaveTextContent('3/10');
    });

    it('should render step text with percentage value type', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} valueType="percentage" />,
      );
      expect(container.querySelector('.MsiProgressBar-stepText')).toHaveTextContent('50%');
    });
  });

  describe('Step Text Position', () => {
    it('should render step text at top by default', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} />,
      );
      const headerContainer = container.querySelector('.MsiProgressBar-headerContainer');
      const stepText = container.querySelector('.MsiProgressBar-stepText');
      expect(headerContainer).toContainElement(stepText);
    });

    it('should render step text at bottom when specified', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} stepTextPosition="bottom" />,
      );
      const headerContainer = container.querySelector('.MsiProgressBar-headerContainer');
      const mainContainer = container.querySelector('.MsiProgressBar-container');
      const stepText = container.querySelector('.MsiProgressBar-stepText');

      expect(headerContainer).not.toContainElement(stepText);
      expect(mainContainer).toContainElement(stepText);
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate 0% progress when currentStep is 0', () => {
      const { container } = render(
        <ProgressBar currentStep={0} totalStepSize={10} />,
      );
      const progressBar = container.querySelector('.MsiProgressBar-linearProgress') as HTMLElement;
      expect(progressBar.style.transform).toBe('translateX(-100%)');
    });

    it('should calculate 50% progress correctly', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} />,
      );
      const progressBar = container.querySelector('.MsiProgressBar-linearProgress') as HTMLElement;
      expect(progressBar.style.transform).toBe('translateX(-50%)');
    });

    it('should calculate 100% progress when currentStep equals totalStepSize', () => {
      const { container } = render(
        <ProgressBar currentStep={10} totalStepSize={10} />,
      );
      const progressBar = container.querySelector('.MsiProgressBar-linearProgress') as HTMLElement;
      expect(progressBar.style.transform).toBe('translateX(-0%)');
    });

    it('should handle totalStepSize of 0 gracefully', () => {
      const { container } = render(
        <ProgressBar currentStep={0} totalStepSize={0} />,
      );
      const progressBar = container.querySelector('.MsiProgressBar-linearProgress') as HTMLElement;
      expect(progressBar.style.transform).toBe('translateX(-100%)');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when currentStep is greater than totalStepSize', () => {
      expect(() => {
        render(<ProgressBar currentStep={11} totalStepSize={10} />);
      }).toThrow('Current step cannot be greater than total step size');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom container className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} containerClassName="custom-container" />,
      );
      expect(container.querySelector('.MsiProgressBar-container')).toHaveClass('custom-container');
    });

    it('should apply custom progress title className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} progressTitle="Test" progressTitleClassName="custom-title" />,
      );
      expect(container.querySelector('.MsiProgressBar-title')).toHaveClass('custom-title');
    });

    it('should apply custom step text className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} stepTextClassName="custom-step-text" />,
      );
      expect(container.querySelector('.MsiProgressBar-stepText')).toHaveClass('custom-step-text');
    });

    it('should apply custom header container className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} headerContainerClassName="custom-header" />,
      );
      expect(container.querySelector('.MsiProgressBar-headerContainer')).toHaveClass('custom-header');
    });

    it('should apply custom linear container className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} linearContainerClassName="custom-linear-container" />,
      );
      expect(container.querySelector('.MsiProgressBar-linearContainer')).toHaveClass('custom-linear-container');
    });

    it('should apply custom linear progress className', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} linearProgressClassName="custom-linear-progress" />,
      );
      expect(container.querySelector('.MsiProgressBar-linearProgress')).toHaveClass('custom-linear-progress');
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative currentStep by clamping to 0', () => {
      const { container } = render(
        <ProgressBar currentStep={-5} totalStepSize={10} />,
      );
      const progressBar = container.querySelector('.MsiProgressBar-linearProgress') as HTMLElement;
      // Progress should be clamped to 0% (translateX -100%)
      expect(progressBar.style.transform).toBe('translateX(-100%)');
    });

    it('should round percentage values correctly', () => {
      const { container } = render(
        <ProgressBar currentStep={1} totalStepSize={3} valueType="percentage" />,
      );
      // 1/3 = 33.33% should be rounded to 33%
      expect(container.querySelector('.MsiProgressBar-stepText')).toHaveTextContent('33%');
    });

    it('should handle header container layout when progressTitle is not provided', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} />,
      );
      const headerContainer = container.querySelector('.MsiProgressBar-headerContainer');
      expect(headerContainer).toHaveClass('justify-end');
      expect(headerContainer).not.toHaveClass('justify-between');
    });

    it('should handle header container layout when progressTitle is provided', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} progressTitle="Test" />,
      );
      const headerContainer = container.querySelector('.MsiProgressBar-headerContainer');
      expect(headerContainer).toHaveClass('justify-between');
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through additional HTML attributes', () => {
      const { container } = render(
        <ProgressBar currentStep={5} totalStepSize={10} data-testid="progress-bar" />,
      );
      expect(container.querySelector('.MsiProgressBar-linearContainer')).toHaveAttribute('data-testid', 'progress-bar');
    });
  });
});
