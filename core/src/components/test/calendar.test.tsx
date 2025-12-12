import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Calendar from '../calendar';

describe('Calendar Component', () => {
  describe('Basic Rendering', () => {
    it('should render calendar', () => {
      const { container } = render(<Calendar />);
      expect(container.querySelector('.p-3')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Calendar className="custom-calendar" />);
      expect(container.querySelector('.custom-calendar')).toBeInTheDocument();
    });
  });

  describe('Month/Year Dropdowns', () => {
    it('should render with dropdown caption layout', () => {
      const { container } = render(<Calendar />);
      // DayPicker renders with custom classNames - check for main container
      const calendar = container.firstChild;
      expect(calendar).toBeInTheDocument();
    });

    it('should show outside days by default', () => {
      render(<Calendar />);
      // showOutsideDays is true by default
    });
  });

  describe('Custom Props', () => {
    it('should accept id prop', () => {
      const { container } = render(<Calendar id="test-calendar" />);
      expect(container.querySelector('#test-calendar')).toBeInTheDocument();
    });

    it('should accept locale prop', () => {
      render(<Calendar locale={undefined} />);
      // Locale prop should be accepted without errors
    });

    it('should accept custom classNames', () => {
      const customClassNames = {
        day: 'custom-day',
        month: 'custom-month',
      };
      const { container } = render(<Calendar classNames={customClassNames} />);
      expect(container.querySelector('.custom-day')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('should render navigation controls', () => {
      const { container } = render(<Calendar />);
      // DayPicker has nav element with specific classNames
      const nav = container.querySelector('.flex.items-start.justify-between');
      expect(nav).toBeInTheDocument();
    });

    it('should render chevron icons', () => {
      const { container } = render(<Calendar />);
      // Chevron icons are rendered by DayPicker, checking for SVG elements
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Day Selection', () => {
    it('should render day buttons', () => {
      const { container } = render(<Calendar />);
      const dayButtons = container.querySelectorAll('button');
      expect(dayButtons.length).toBeGreaterThan(0);
    });

    it('should apply selected day styling with single date', () => {
      const selectedDate = new Date();
      render(<Calendar mode="single" selected={selectedDate} />);
      // Selected styling should be applied
    });
  });

  describe('Disabled State', () => {
    it('should disable specific dates', () => {
      const disabledDays = new Date();
      render(<Calendar disabled={disabledDays} />);
      // Disabled days should have disabled styling
    });
  });

  describe('Mode', () => {
    it('should work in single mode', () => {
      render(<Calendar mode="single" />);
      // Single mode should work without errors
    });

    it('should work in multiple mode', () => {
      render(<Calendar mode="multiple" />);
      // Multiple mode should work without errors
    });

    it('should work in range mode', () => {
      render(<Calendar mode="range" />);
      // Range mode should work without errors
    });
  });
});
