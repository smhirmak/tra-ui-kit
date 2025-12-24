import { useEffect } from 'react';
import { Avatar, MultipleAvatarContainer } from '@/components/avatar';
import Badge from '@/components/badge';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTOC } from '@/contexts/toc/TOCContext';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'circular', title: 'Circular', level: 2 },
  { id: 'rounded', title: 'Rounded', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'badges', title: 'With Badges', level: 1 },
  { id: 'multiple', title: 'Multiple Avatars', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'variant', type: '"circular" | "rounded"', default: '"circular"', description: 'The shape variant of the avatar' },
  { prop: 'size', type: '"sm" | "default"', default: '"default"', description: 'The size of the avatar' },
  { prop: 'src', type: 'string', default: '-', description: 'Image source URL' },
  { prop: 'title', type: 'string', default: '-', description: 'Text to display when no image is provided' },
  { prop: 'badgeContent', type: 'ReactNode', default: '-', description: 'Badge component to display' },
  { prop: 'badgePosition', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: 'Position of the badge' },
  { prop: 'asChild', type: 'string', default: '-', description: 'Render as a different element (e.g., "a")' },
];

const AvatarPage = () => {
  const { setTocItems } = useTOC();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Avatar</h1>
        <p className="text-lg text-neutral-grey">
          Avatar component for displaying user profile images with various sizes, shapes, and badge support.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <CustomSyntaxHighlighter content='npx msi-ui-cli add avatar' />
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Avatar src="/assets/logos/logo.png" />
          </div>
          <CustomSyntaxHighlighter content='<Avatar src="/assets/logos/logo.png" />' />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Circular */}
        <div id="circular" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Circular</h3>
          <p className="text-neutral-grey">The default circular avatar variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Avatar size="sm" />
              <Avatar size="sm" title="Muhammed Semih Irmak" />
              <Avatar size="sm" src="/assets/logos/logo.png" />
              <Avatar />
              <Avatar title="Muhammed Semih Irmak" />
              <Avatar src="/assets/logos/logo.png" />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<Avatar src="/assets/logos/logo.png" />' />
        </div>

        {/* Rounded */}
        <div id="rounded" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Rounded</h3>
          <p className="text-neutral-grey">Avatar with rounded corners.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Avatar size="sm" variant="rounded" />
              <Avatar size="sm" variant="rounded" title="Muhammed Semih Irmak" />
              <Avatar size="sm" variant="rounded" src="/assets/logos/logo.png" />
              <Avatar variant="rounded" />
              <Avatar variant="rounded" title="Muhammed Semih Irmak" />
              <Avatar variant="rounded" src="/assets/logos/logo.png" />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<Avatar variant="rounded" src="/assets/logos/logo.png" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Avatar comes in two different sizes.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-4">
            <Avatar size="sm" src="/assets/logos/logo.png" />
            <Avatar src="/assets/logos/logo.png" />
          </div>
        </div>
        <CustomSyntaxHighlighter className="mb-2" content='<Avatar size="sm" src="/assets/logos/logo.png" />' />
        <CustomSyntaxHighlighter content='<Avatar src="/assets/logos/logo.png" />' />
      </section>

      {/* Badges */}
      <section id="badges">
        <h2 className="mb-4 text-2xl font-bold">With Badges</h2>
        <p className="mb-4 text-neutral-grey">Avatars can display badges in different positions.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Avatar size="sm" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" />} />
            <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="bottom-right" badgeContent={<Badge size="sm" color="secondary" />} />
            <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="top-left" badgeContent={<Badge size="sm" color="secondary" />} />
            <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge size="sm" color="secondary" />} />
            <Avatar src="/assets/logos/logo.png" badgeContent={<Badge />} />
            <Avatar src="/assets/logos/logo.png" badgePosition="bottom-right" badgeContent={<Badge color="secondary" />} />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Avatar src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge color="secondary" />} />' />
      </section>

      {/* Multiple */}
      <section id="multiple">
        <h2 className="mb-4 text-2xl font-bold">Multiple Avatars</h2>
        <p className="mb-4 text-neutral-grey">Display multiple avatars in a container with overflow indicator.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <MultipleAvatarContainer lastElementSize="sm" childrenClassName="border-background border-4">
            <Avatar size="sm" asChild="a" href="/asd" target="_blank" className="bg-neutral-grey text-black" />
            <Avatar size="sm" src="/assets/logos/logo.png" />
            <Avatar size="sm" />
            <Avatar size="sm" className="bg-disabled-light-dark" />
            <Avatar size="sm" src="/assets/logos/logo.png" />
            <Avatar size="sm" />
            <Avatar size="sm" className="bg-error" />
            <Avatar size="sm" src="/assets/logos/logo.png" />
            <Avatar size="sm" src="/assets/logos/logo.png" />
          </MultipleAvatarContainer>
        </div>
        <CustomSyntaxHighlighter content={`<MultipleAvatarContainer lastElementSize="sm" childrenClassName="border-background border-4">
  <Avatar size="sm" asChild="a" href="/asd" target="_blank" className="bg-neutral-grey text-black" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" />
  <Avatar size="sm" className="bg-disabled-light-dark" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" />
  <Avatar size="sm" className="bg-error" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
</MultipleAvatarContainer>`} />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default AvatarPage;
