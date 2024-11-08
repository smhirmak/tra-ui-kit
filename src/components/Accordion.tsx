/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CaretDown } from '@/assets/Icons';
import { IAccordion, IAccordionContent, IAccordionItem, IAccordionTrigger } from '@/types/types';
import React, { useState } from 'react';

// Accordion Wrapper Component
export const Accordion: React.FC<IAccordion> = ({ children, className }) => <div className={`accordion w-fit ${className}`}>{children}</div>;

export const AccordionTrigger: React.FC<IAccordionTrigger> = ({ onClick, isOpen, children, className }) => (
  <div
    onClick={onClick}
    className={`flex cursor-pointer select-none items-center justify-between py-4 text-lg font-medium transition-all hover:underline ${className}`}
  >
    {children}
    <CaretDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
  </div>
);

export const AccordionContent: React.FC<IAccordionContent> = ({ isOpen, children, className }) => (
  <div
    className={`overflow-hidden transition-all duration-250 ${className} ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
  >
    {children}
  </div>
);

export const AccordionItem: React.FC<IAccordionItem> = ({ title, children, className, triggerClassName, contentClassName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border-b border-border ${className}`}>
      <AccordionTrigger className={triggerClassName} onClick={toggleAccordion} isOpen={isOpen}>
        {title}
      </AccordionTrigger>
      <AccordionContent className={contentClassName} isOpen={isOpen}>{children}</AccordionContent>
    </div>
  );
};
