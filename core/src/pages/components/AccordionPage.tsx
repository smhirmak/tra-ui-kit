import { Plus } from '@phosphor-icons/react';
import { Accordion, AccordionItem } from '@/components/Accordion';

const AccordionPage = () => (
  <div className="grid grid-cols-4 gap-10">
    <div>
      <p className="mb-4 text-4xl underline">Underlined</p>
      <Accordion multipleExpand>
        <AccordionItem title="Section 1" subTitle="Sub Title" defaultOpen startContent={<Plus className="size-6" />}>
          <p>This is the content of Section 1</p>
          <p>This is the content of Section 1</p>
        </AccordionItem>
        <AccordionItem title="Section 2 Disabled" disabled>
          <p>This is the content of Section 2</p>
        </AccordionItem>
        <AccordionItem title="Section 3" icon={<Plus />}>
          <p>This is the content of Section 3</p>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Outlined</p>
      <Accordion variant="outlined">
        <AccordionItem title="Section 1" subTitle="Sub Title">
          <p>This is the content of Section 1</p>
          <p>This is the content of Section 1</p>
        </AccordionItem>
        <AccordionItem title="Section 2 Disabled" disabled>
          <p>This is the content of Section 2</p>
        </AccordionItem>
        <AccordionItem title="Section 3">
          <p>This is the content of Section 3</p>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Solid</p>
      <Accordion variant="solid">
        <AccordionItem title="Section 1" subTitle="Sub Title">
          <p>This is the content of Section 1</p>
          <p>This is the content of Section 1</p>
        </AccordionItem>
        <AccordionItem title="Section 2 Disabled" disabled>
          <p>This is the content of Section 2</p>
        </AccordionItem>
        <AccordionItem title="Section 3">
          <p>This is the content of Section 3</p>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Splitted</p>
      <Accordion variant="splitted">
        <AccordionItem title="Section 1" subTitle="Sub Title">
          <p>This is the content of Section 1</p>
          <p>This is the content of Section 1</p>
        </AccordionItem>
        <AccordionItem title="Section 2 Disabled" disabled>
          <p>This is the content of Section 2</p>
        </AccordionItem>
        <AccordionItem title="Section 3">
          <p>This is the content of Section 3</p>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

export default AccordionPage;
