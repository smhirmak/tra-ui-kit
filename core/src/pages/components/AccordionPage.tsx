import { Plus } from '@phosphor-icons/react';
import { Accordion, AccordionItem } from '@/components/accordion';
import { CustomSyntaxHighlighter } from '../installation';

const AccordionPage = () => (
  <div className="grid grid-cols-1 gap-10">
    <p className="mb-4 text-4xl underline">Underlined</p>
    <div className="flex flex-col gap-4">
      <Accordion multipleExpand className="self-center">
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
      <div>
        <p className="text-2xl">Usage:</p>
        <CustomSyntaxHighlighter content={`
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
  </Accordion>`}
        />
      </div>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Outlined</p>
      <div className="flex flex-col gap-4">
        <Accordion variant="outlined" className="self-center">
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
        <p className="text-2xl">Usage:</p>
        <CustomSyntaxHighlighter content={`
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
  </Accordion>`}
        />
      </div>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Solid</p>
      <div className="flex flex-col gap-4">
        <Accordion variant="solid" className="self-center">
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
        <div>
          <p className="text-2xl">Usage:</p>
          <CustomSyntaxHighlighter content={`
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
  </Accordion>`}
          />
        </div>
      </div>
    </div>
    <div>
      <p className="mb-4 text-4xl underline">Splitted</p>
      <div className="flex flex-col gap-4">
        <Accordion variant="splitted" className="self-center">
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
        <div>
          <p className="text-2xl">Usage:</p>
          <CustomSyntaxHighlighter content={`
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
    </Accordion>`}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AccordionPage;
