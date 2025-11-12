import { Plus } from '@phosphor-icons/react';
import Badge from '@/components/Badge';
import { CustomSyntaxHighlighter } from '../installation';

const BadgePage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Badge</p>
    <p className="mt-2 text-xl">Small:</p>
    <div className="my-2 flex space-x-2">
      <Badge color="primary" size="sm" />
      <Badge color="error" size="sm" />
      <Badge color="secondary" size="sm" />
      <Badge color="success" size="sm" />
      <Badge color="tetriary" size="sm" />
      <Badge color="warning" size="sm" />
      <Badge icon={<Plus className="size-2" />} size="sm" />
      <Badge text="S" size="sm" className="text-xs" />
    </div>
    <CustomSyntaxHighlighter content='<Badge color="primary" size="sm" />' />
    <p className="mt-2 text-xl">Default:</p>
    <div className="my-2 flex space-x-2">
      <Badge color="primary" />
      <Badge color="error" />
      <Badge color="secondary" />
      <Badge color="success" />
      <Badge color="tetriary" />
      <Badge color="warning" />
      <Badge icon={<Plus />} />
      <Badge text="S" />
    </div>
    <CustomSyntaxHighlighter content='<Badge color="primary" />' />
    <p className="my-2 text-xl">Large:</p>
    <div className="mt-2 flex space-x-2">
      <Badge color="primary" size="lg" />
      <Badge color="error" size="lg" />
      <Badge color="secondary" size="lg" />
      <Badge color="success" size="lg" />
      <Badge color="tetriary" size="lg" />
      <Badge color="warning" size="lg" />
      <Badge icon={<Plus />} size="lg" />
      <Badge text="S" size="lg" />
    </div>
    <CustomSyntaxHighlighter content='<Badge color="primary" size="lg" />' />
    <p className="mt-2 text-xl">Default With Text:</p>
    <div className="my-2 flex space-x-2">
      <Badge color="primary" text="Text" />
      <Badge color="error" text="Text" />
      <Badge color="secondary" text="Text" />
      <Badge color="success" text="Text" />
      <Badge color="tetriary" text="Text" />
      <Badge color="warning" text="Text" />
      <Badge icon={<Plus />} text="Text" />
    </div>
    <CustomSyntaxHighlighter content='<Badge color="primary" text="Text" />' />
  </div>
);

export default BadgePage;
