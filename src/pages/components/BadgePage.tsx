import { Plus } from '@/assets/Icons';
import Badge from '@/components/Badge';

const BadgePage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Badge</p>
    <p className="mt-2 text-xl">Small:</p>
    <div className="mt-2 flex space-x-2">
      <Badge color="primary" size="sm" />
      <Badge color="error" size="sm" />
      <Badge color="secondary" size="sm" />
      <Badge color="success" size="sm" />
      <Badge color="tetriary" size="sm" />
      <Badge color="warning" size="sm" />
      <Badge icon={<Plus className="size-2" />} size="sm" />
      <Badge text="S" size="sm" className="text-xs" />
    </div>
    <p className="mt-2 text-xl">Default:</p>
    <div className="mt-2 flex space-x-2">
      <Badge color="primary" />
      <Badge color="error" />
      <Badge color="secondary" />
      <Badge color="success" />
      <Badge color="tetriary" />
      <Badge color="warning" />
      <Badge icon={<Plus />} />
      <Badge text="S" />
    </div>
    <p className="mt-2 text-xl">Large:</p>
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
    <p className="mt-2 text-xl">Default With Text:</p>
    <div className="mt-2 flex space-x-2">
      <Badge color="primary" text="Text" />
      <Badge color="error" text="Text" />
      <Badge color="secondary" text="Text" />
      <Badge color="success" text="Text" />
      <Badge color="tetriary" text="Text" />
      <Badge color="warning" text="Text" />
      <Badge icon={<Plus />} text="Text" />
    </div>
  </div>
);

export default BadgePage;
