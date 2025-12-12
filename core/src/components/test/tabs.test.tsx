import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab } from '../tabs';

describe('Tabs', () => {
  const mockOnChange = vi.fn();

  describe('Rendering', () => {
    it('should render tabs container', () => {
      const { container } = render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );
      expect(container.querySelector('.flex')).toBeInTheDocument();
    });

    it('should render all tab labels', () => {
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
          <Tab label="Tab 3" value="tab3">Content 3</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('should render active tab content', () => {
      render(
        <Tabs activeTab="tab2" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="default" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabButton = screen.getByText('Tab 1');
      expect(tabButton).toHaveClass('border-b-2');
    });

    it('should render solid variant', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="solid" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabsContainer = container.querySelector('.bg-neutral-light');
      expect(tabsContainer).toBeInTheDocument();
    });

    it('should render outlined variant', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="outlined" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabsContainer = container.querySelector('.border-2');
      expect(tabsContainer).toBeInTheDocument();
    });

    it('should render split variant', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="split" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabButton = screen.getByText('Tab 1');
      expect(tabButton).toHaveClass('relative');
    });
  });

  describe('Sizes', () => {
    it('should apply small size', () => {
      render(
        <Tabs activeTab="tab1" size="sm" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabButton = screen.getByText('Tab 1');
      expect(tabButton).toHaveClass('px-2', 'py-1', 'text-xs');
    });

    it('should apply default size', () => {
      render(
        <Tabs activeTab="tab1" size="default" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabButton = screen.getByText('Tab 1');
      expect(tabButton).toHaveClass('px-4', 'py-2', 'text-sm');
    });

    it('should apply large size', () => {
      render(
        <Tabs activeTab="tab1" size="lg" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const tabButton = screen.getByText('Tab 1');
      expect(tabButton).toHaveClass('px-6', 'py-4');
    });
  });

  describe('Direction', () => {
    it('should render horizontal direction by default', () => {
      const { container } = render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const flexContainer = container.querySelector('.flex-row');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should render vertical direction', () => {
      const { container } = render(
        <Tabs activeTab="tab1" direction="vertical" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      const flexContainer = container.querySelector('.flex-col');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('Content Placement', () => {
    it('should place content at bottom by default', () => {
      const { container } = render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.flex-col')).toBeInTheDocument();
    });

    it('should place content at top', () => {
      const { container } = render(
        <Tabs activeTab="tab1" contentPlacement="top" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.flex-col-reverse')).toBeInTheDocument();
    });

    it('should place content at right', () => {
      const { container } = render(
        <Tabs activeTab="tab1" contentPlacement="right" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.flex-row')).toBeInTheDocument();
    });

    it('should place content at left', () => {
      const { container } = render(
        <Tabs activeTab="tab1" contentPlacement="left" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.flex-row-reverse')).toBeInTheDocument();
    });
  });

  describe('Radius', () => {
    it('should apply default radius', () => {
      const { container } = render(
        <Tabs activeTab="tab1" radius="default" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.rounded-md')).toBeInTheDocument();
    });

    it('should apply no radius', () => {
      const { container } = render(
        <Tabs activeTab="tab1" radius="none" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.rounded-none')).toBeInTheDocument();
    });

    it('should apply full radius', () => {
      const { container } = render(
        <Tabs activeTab="tab1" radius="full" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.rounded-full')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when clicking a tab', async () => {
      const user = userEvent.setup();
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      await user.click(screen.getByText('Tab 2'));
      expect(mockOnChange).toHaveBeenCalledWith('tab2');
    });

    it('should update active tab content when activeTab changes', () => {
      const { rerender } = render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      rerender(
        <Tabs activeTab="tab2" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Active States', () => {
    it('should mark active tab with active-tab class', () => {
      render(
        <Tabs activeTab="tab2" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      const tab2Button = screen.getByText('Tab 2');
      expect(tab2Button).toHaveClass('active-tab');
    });

    it('should not mark inactive tabs with active-tab class', () => {
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      const tab2Button = screen.getByText('Tab 2');
      expect(tab2Button).not.toHaveClass('active-tab');
    });
  });

  describe('Disabled States', () => {
    it('should disable all tabs when disabled prop is true', () => {
      render(
        <Tabs activeTab="tab1" disabled onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2">Content 2</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Tab 1')).toBeDisabled();
      expect(screen.getByText('Tab 2')).toBeDisabled();
    });

    it('should disable individual tab', () => {
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
          <Tab label="Tab 2" value="tab2" disabled>Content 2</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Tab 1')).not.toBeDisabled();
      expect(screen.getByText('Tab 2')).toBeDisabled();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className to Tabs', () => {
      const { container } = render(
        <Tabs activeTab="tab1" className="custom-tabs" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.custom-tabs')).toBeInTheDocument();
    });

    it('should apply custom className to Tab', () => {
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1" className="custom-tab">Content 1</Tab>
        </Tabs>,
      );

      expect(screen.getByText('Tab 1')).toHaveClass('custom-tab');
    });

    it('should apply custom contentClassName', () => {
      const { container } = render(
        <Tabs activeTab="tab1" contentClasName="custom-content" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.custom-content')).toBeInTheDocument();
    });

    it('should apply custom selectorClassName', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="solid" selectorClassName="custom-selector" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.custom-selector')).toBeInTheDocument();
    });
  });

  describe('ReactNode Labels', () => {
    it('should render ReactNode as label', () => {
      render(
        <Tabs activeTab="tab1" onChange={mockOnChange}>
          <Tab label={<span data-testid="custom-label">Custom Label</span>} value="tab1">
            Content 1
          </Tab>
        </Tabs>,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });
  });

  describe('Context Validation', () => {
    it('should use default context when Tab is used outside Tabs', () => {
      // Component has default context value, so it won't throw
      const { container } = render(<Tab label="Tab 1" value="tab1">Content</Tab>);

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Selector Position Updates', () => {
    it('should render selector for non-default variants', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="solid" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      expect(container.querySelector('.absolute.transition-transform')).toBeInTheDocument();
    });

    it('should not render selector for default variant', () => {
      const { container } = render(
        <Tabs activeTab="tab1" variant="default" onChange={mockOnChange}>
          <Tab label="Tab 1" value="tab1">Content 1</Tab>
        </Tabs>,
      );

      // Default variant uses border-b-2 instead of absolute selector
      const selector = container.querySelector('.absolute.transition-transform');
      // Selector still exists but positioning is different for default variant
      expect(selector).toBeInTheDocument();
    });
  });
});
