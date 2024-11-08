import { Accordion, AccordionItem } from '@/components/Accordion';
import React from 'react';

const AccordionPage = () => (
  <Accordion>
    <AccordionItem title="Section 1">
      <p>This is the content of Section 1</p>
      <p>This is the content of Section 1</p>
    </AccordionItem>
    <AccordionItem title="Section 2">
      <p>This is the content of Section 2</p>
    </AccordionItem>
    <AccordionItem title="Section 3">
      <p>This is the content of Section 3</p>
    </AccordionItem>
  </Accordion>
);

export default AccordionPage;
