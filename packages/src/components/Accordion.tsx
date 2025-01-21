import { CaretDown } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React, { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const accordionItemVariants = cva('border-border border-b', {
  variants: {
    variant: {
      underlined: '',
      outlined: '',
      solid: 'data-[disabled="true"]:bg-disabled-light-dark',
      splitted: 'bg-neutral data-[disabled="true"]:bg-disabled-light-dark rounded-md',
    },
  },
});

const accordionVariants = cva('w-fit rounded-md ', {
  variants: {
    variant: {
      underlined: '',
      outlined: 'border-border border',
      solid: 'bg-neutral',
      splitted: 'flex flex-col gap-1',
    },
  },
});

const accordionTriggerVariants = cva(
  `data-[disabled="true"]:text-disabled flex cursor-pointer select-none items-center justify-between rounded-md 
  p-4 text-lg font-medium transition-all 
  duration-300 data-[disabled="true"]:cursor-default`,
  {
    variants: {
      variant: {
        underlined: '',
        outlined: '',
        solid: '',
        splitted: '',
      },
    },
  },
);

const accoridonContentVariants = cva(`overflow-hidden px-4 py-0.5 transition-all duration-200
  data-[open="false"]:max-h-0 data-[open="true"]:max-h-full
  data-[open="false"]:opacity-0 data-[open="true"]:opacity-100`);

interface IAccordion {
  children: ReactNode;
  className?: string;
  multipleExpand?: boolean;
  variant?: 'solid' | 'outlined' | 'splitted' | 'underlined';
}

interface IAccordionItem {
  title: string;
  subTitle?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  isOpen?: boolean;
  onClick?: () => void | undefined;
  variant?: 'solid' | 'outlined' | 'splitted' | 'underlined';
  disabled?: boolean;
  defaultOpen?: boolean;
  startContent?: ReactNode;
  icon?: ReactNode;
  titleClassName?: string;
}

interface IAccordionTrigger {
  onClick?: () => void | undefined;
  isOpen: boolean;
  title: string;
  subTitle?: string;
  className?: string;
  disabled?: boolean;
  startContent?: ReactNode;
  icon?: ReactNode;
  iconContainerClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  variant?: 'solid' | 'outlined' | 'splitted' | 'underlined';
}

interface IAccordionContent {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export const Accordion: React.FC<IAccordion> = ({ children, className, multipleExpand = false, variant = 'underlined' }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const initialOpenIndexes: number[] = [];
    let initialOpenIndex: number | null = null;

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const { defaultOpen } = child.props as IAccordionItem;
        if (defaultOpen) {
          if (multipleExpand) {
            initialOpenIndexes.push(index);
          } else {
            initialOpenIndex = index;
          }
        }
      }
    });

    if (multipleExpand) {
      setOpenIndexes(initialOpenIndexes);
    } else {
      setOpenIndex(initialOpenIndex);
    }
  }, [children, multipleExpand]);

  const handleItemClick = (index: number) => {
    if (multipleExpand) {
      setOpenIndexes(prevIndexes => (prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index]));
    } else {
      setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    }
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn(accordionVariants({ variant }), className)}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<IAccordionItem>, {
            isOpen: multipleExpand ? openIndexes.includes(index) : openIndex === index,
            onClick: () => handleItemClick(index),
            variant,
          });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger: React.FC<IAccordionTrigger> = ({ title, subTitle, onClick, isOpen, className, variant, disabled, startContent, icon, iconContainerClassName,
  titleClassName, subTitleClassName }) => (
  <div
    onClick={disabled ? () => { } : onClick}
    data-disabled={disabled}
    className={cn(accordionTriggerVariants({ variant }), className)}
  >
    <div className="flex items-center gap-2">
      {startContent}
      <div>
        <p className={`text-lg ${titleClassName}`}>{title}</p>
        {subTitle && <p className={`text-neutral-grey text-sm ${subTitleClassName}`}>{subTitle}</p>}
      </div>
    </div>
    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} ${iconContainerClassName}`}>{icon ?? <CaretDown />}</span>
  </div>
);

export const AccordionContent: React.FC<IAccordionContent> = ({ isOpen, children, className }) => (
  <div
    className={cn(accoridonContentVariants({}), className)}
    data-open={isOpen}
  >
    {children}
  </div>
);

export const AccordionItem: React.FC<IAccordionItem> = ({
  title,
  subTitle,
  isOpen = false,
  onClick,
  children,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  variant,
  disabled,
  startContent,
  titleClassName = '',
  icon,
}) => (
  <div className={cn(accordionItemVariants({ variant }), className)} data-disabled={disabled}>
    <AccordionTrigger
      title={title}
      subTitle={subTitle}
      className={triggerClassName}
      titleClassName={titleClassName}
      onClick={disabled ? () => { } : onClick}
      isOpen={isOpen}
      variant={variant}
      disabled={disabled}
      startContent={startContent}
      icon={icon}
    />
    <AccordionContent className={contentClassName} isOpen={isOpen}>
      {children}
    </AccordionContent>
  </div>
);
