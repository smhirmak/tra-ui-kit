import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

describe('Accordion Component', () => {
  describe('Accordion', () => {
    it('should render accordion with children', () => {
      render(
        <Accordion>
          <AccordionItem title="Item 1">Content 1</AccordionItem>
          <AccordionItem title="Item 2">Content 2</AccordionItem>
        </Accordion>,
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Accordion className="custom-class">
          <AccordionItem title="Item 1">Content 1</AccordionItem>
        </Accordion>,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render with different variants', () => {
      const variants = ['solid', 'outlined', 'splitted', 'underlined'] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <Accordion variant={variant}>
            <AccordionItem title="Item 1">Content 1</AccordionItem>
          </Accordion>,
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should handle single expand mode by default', () => {
      render(
        <Accordion>
          <AccordionItem title="Item 1">Content 1</AccordionItem>
          <AccordionItem title="Item 2">Content 2</AccordionItem>
        </Accordion>,
      );

      const item1 = screen.getByText('Item 1');
      const item2 = screen.getByText('Item 2');

      fireEvent.click(item1);
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      fireEvent.click(item2);
      expect(screen.getByText('Content 2')).toBeInTheDocument();

      // In single expand mode, first item should be closed
      const content1 = screen.getByText('Content 1').closest('[data-open]');
      expect(content1).toHaveAttribute('data-open', 'false');
    });

    it('should handle multiple expand mode', () => {
      render(
        <Accordion multipleExpand>
          <AccordionItem title="Item 1">Content 1</AccordionItem>
          <AccordionItem title="Item 2">Content 2</AccordionItem>
        </Accordion>,
      );

      const item1 = screen.getByText('Item 1');
      const item2 = screen.getByText('Item 2');

      fireEvent.click(item1);
      fireEvent.click(item2);

      const content1 = screen.getByText('Content 1').closest('[data-open]');
      const content2 = screen.getByText('Content 2').closest('[data-open]');

      expect(content1).toHaveAttribute('data-open', 'true');
      expect(content2).toHaveAttribute('data-open', 'true');
    });

    it('should toggle accordion item when clicked', () => {
      render(
        <Accordion>
          <AccordionItem title="Item 1">Content 1</AccordionItem>
        </Accordion>,
      );

      const trigger = screen.getByText('Item 1');
      const content = screen.getByText('Content 1').closest('[data-open]');

      // Initially closed
      expect(content).toHaveAttribute('data-open', 'false');

      // Click to open
      fireEvent.click(trigger);
      expect(content).toHaveAttribute('data-open', 'true');

      // Click to close
      fireEvent.click(trigger);
      expect(content).toHaveAttribute('data-open', 'false');
    });

    it('should respect defaultOpen prop in single expand mode', () => {
      render(
        <Accordion>
          <AccordionItem
            title="Item 1"
            defaultOpen
          >
            Content 1
          </AccordionItem>
          <AccordionItem title="Item 2">Content 2</AccordionItem>
        </Accordion>,
      );

      const content1 = screen.getByText('Content 1').closest('[data-open]');
      expect(content1).toHaveAttribute('data-open', 'true');
    });

    it('should respect defaultOpen prop in multiple expand mode', () => {
      render(
        <Accordion multipleExpand>
          <AccordionItem
            title="Item 1"
            defaultOpen
          >
            Content 1
          </AccordionItem>
          <AccordionItem
            title="Item 2"
            defaultOpen
          >
            Content 2
          </AccordionItem>
        </Accordion>,
      );

      const content1 = screen.getByText('Content 1').closest('[data-open]');
      const content2 = screen.getByText('Content 2').closest('[data-open]');

      expect(content1).toHaveAttribute('data-open', 'true');
      expect(content2).toHaveAttribute('data-open', 'true');
    });
  });

  describe('AccordionItem', () => {
    it('should render item with title and content', () => {
      render(
        <AccordionItem
          title="Test Item"
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(
        <AccordionItem
          title="Test Item"
          subTitle="Test Subtitle"
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should call onClick when clicked and not disabled', () => {
      const handleClick = vi.fn();
      render(
        <AccordionItem
          title="Test Item"
          onClick={handleClick}
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      fireEvent.click(screen.getByText('Test Item'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <AccordionItem
          title="Test Item"
          onClick={handleClick}
          disabled
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      fireEvent.click(screen.getByText('Test Item'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should apply disabled styling when disabled', () => {
      const { container } = render(
        <AccordionItem
          title="Test Item"
          disabled
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      const itemDiv = container.firstChild;
      expect(itemDiv).toHaveAttribute('data-disabled', 'true');
    });

    it('should render with startContent', () => {
      render(
        <AccordionItem
          title="Test Item"
          startContent={<span>🔥</span>}
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      expect(screen.getByText('🔥')).toBeInTheDocument();
    });

    it('should render with custom icon', () => {
      render(
        <AccordionItem
          title="Test Item"
          icon={<span data-testid="custom-icon">→</span>}
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should apply custom classNames', () => {
      const { container } = render(
        <AccordionItem
          title="Test Item"
          className="item-class"
          triggerClassName="trigger-class"
          contentClassName="content-class"
          titleClassName="title-class"
          isOpen={false}
        >
          Test Content
        </AccordionItem>,
      );

      const itemDiv = container.firstChild;
      expect(itemDiv).toHaveClass('item-class');
    });
  });

  describe('AccordionTrigger', () => {
    it('should render trigger with title', () => {
      render(
        <AccordionTrigger
          title="Test Trigger"
          isOpen={false}
        />,
      );
      expect(screen.getByText('Test Trigger')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(
        <AccordionTrigger
          title="Test Trigger"
          subTitle="Test Subtitle"
          isOpen={false}
        />,
      );
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(
        <AccordionTrigger
          title="Test Trigger"
          onClick={handleClick}
          isOpen={false}
        />,
      );

      fireEvent.click(screen.getByText('Test Trigger'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <AccordionTrigger
          title="Test Trigger"
          onClick={handleClick}
          disabled
          isOpen={false}
        />,
      );

      fireEvent.click(screen.getByText('Test Trigger'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should rotate icon when open', () => {
      const { container, rerender } = render(
        <AccordionTrigger
          title="Test Trigger"
          isOpen={false}
        />,
      );

      let iconSpan = container.querySelector('span:last-child');
      expect(iconSpan).toHaveClass('rotate-0');

      rerender(
        <AccordionTrigger
          title="Test Trigger"
          isOpen
        />,
      );
      iconSpan = container.querySelector('span:last-child');
      expect(iconSpan).toHaveClass('rotate-180');
    });

    it('should render custom icon', () => {
      render(
        <AccordionTrigger
          title="Test Trigger"
          icon={<span data-testid="custom-icon">+</span>}
          isOpen={false}
        />,
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render startContent', () => {
      render(
        <AccordionTrigger
          title="Test Trigger"
          startContent={<span data-testid="start-content">★</span>}
          isOpen={false}
        />,
      );

      expect(screen.getByTestId('start-content')).toBeInTheDocument();
    });
  });

  describe('AccordionContent', () => {
    it('should render content', () => {
      render(<AccordionContent isOpen>Test Content</AccordionContent>);

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should have correct data-open attribute when open', () => {
      const { container } = render(<AccordionContent isOpen>Test Content</AccordionContent>);

      expect(container.firstChild).toHaveAttribute('data-open', 'true');
    });

    it('should have correct data-open attribute when closed', () => {
      const { container } = render(
        <AccordionContent isOpen={false}>Test Content</AccordionContent>,
      );

      expect(container.firstChild).toHaveAttribute('data-open', 'false');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <AccordionContent
          isOpen
          className="custom-content"
        >
          Test Content
        </AccordionContent>,
      );

      expect(container.firstChild).toHaveClass('custom-content');
    });
  });
});
