import { Plus } from '@phosphor-icons/react';
import { Avatar, MultipleAvatarContainer } from '@/components/Avatar';
import Badge from '@/components/Badge';
import { CustomSyntaxHighlighter } from '../installation';

const AvatarPage = () => (
  <div>
    <p className="text-4xl underline">Avatar</p>
    <p className="mt-2 text-xl">Small Circular:</p>
    <div className="mb-4 mt-2 flex space-x-2">
      <Avatar size="sm" />
      <Avatar size="sm" title="Muhammed Semih Irmak" />
      <Avatar size="sm" src="/assets/logos/logo.png" />
      <Avatar size="sm" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" />} />
      <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="bottom-right" badgeContent={<Badge size="sm" color="secondary" />} />
      <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="top-left" badgeContent={<Badge size="sm" color="secondary" />} />
      <Avatar size="sm" src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge size="sm" color="secondary" />} />
    </div>
    <CustomSyntaxHighlighter content='<Avatar size="sm" src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge size="sm" color="secondary" />} />' />
    <p className="mt-2 text-xl">Small Rounded:</p>
    <div className="mb-4 mt-2 flex space-x-2">
      <Avatar size="sm" variant="rounded" />
      <Avatar size="sm" variant="rounded" title="Muhammed Semih Irmak" />
      <Avatar size="sm" variant="rounded" src="/assets/logos/logo.png" />
      <Avatar size="sm" variant="rounded" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" />} />
      <Avatar size="sm" variant="rounded" badgePosition="bottom-right" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" color="secondary" />} />
      <Avatar size="sm" variant="rounded" badgePosition="top-left" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" color="secondary" />} />
      <Avatar size="sm" variant="rounded" badgePosition="bottom-left" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" color="secondary" />} />
    </div>
    <CustomSyntaxHighlighter content='<Avatar size="sm" variant="rounded" badgePosition="bottom-left" src="/assets/logos/logo.png" badgeContent={<Badge size="sm" color="secondary" />} />' />
    <p className="mt-2 text-xl">Multiple Avatar :</p>
    <div className="mt-2">
      <MultipleAvatarContainer lastElementSize="sm">
        <Avatar size="sm" asChild="a" href="/asd" className="bg-neutral-grey text-black" />
        <Avatar size="sm" src="/assets/logos/logo.png" />
        <Avatar size="sm" />
        <Avatar size="sm" className="bg-disabled-light-dark" />
        <Avatar size="sm" src="/assets/logos/logo.png" />
        <Avatar size="sm" />
        <Avatar size="sm" className="bg-error" />
        <Avatar size="sm" src="/assets/logos/logo.png" />
        <Avatar size="sm" src="/assets/logos/logo.png" />
      </MultipleAvatarContainer>
      <CustomSyntaxHighlighter content={`
<MultipleAvatarContainer lastElementSize="sm">
  <Avatar size="sm" asChild="a" href="/asd" className="bg-neutral-grey text-black" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" />
  <Avatar size="sm" className="bg-disabled-light-dark" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" />
  <Avatar size="sm" className="bg-error" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
  <Avatar size="sm" src="/assets/logos/logo.png" />
</MultipleAvatarContainer>`}
      />
    </div>
    <p className="mt-2 text-xl">Large Circular:</p>
    <div className="my-4 flex flex-wrap space-x-2 space-y-2">
      <Avatar />
      <Avatar title="Muhammed Semih Irmak" />
      <Avatar src="/assets/logos/logo.png" />
      <Avatar src="/assets/logos/logo.png" badgeContent={<Badge />} />
      <Avatar src="/assets/logos/logo.png" badgePosition="bottom-right" badgeContent={<Badge color="secondary" />} />
      <Avatar src="/assets/logos/logo.png" badgePosition="top-left" badgeContent={<Badge />} />
      <Avatar src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge color="secondary" />} />
    </div>
    <CustomSyntaxHighlighter content='<Avatar src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge color="secondary" />} />' />
    <p className="mt-2 text-xl">Large Rounded:</p>
    <div className="my-2 flex flex-wrap space-x-2 space-y-2">
      <Avatar variant="rounded" />
      <Avatar variant="rounded" title="Muhammed Semih Irmak" />
      <Avatar variant="rounded" src="/assets/logos/logo.png" />
      <Avatar variant="rounded" src="/assets/logos/logo.png" badgeContent={<Badge icon={<Plus className="size-4" />} />} />
      <Avatar variant="rounded" src="/assets/logos/logo.png" badgePosition="bottom-right" badgeContent={<Badge icon={<Plus className="size-4" />} color="primary" />} />
      <Avatar variant="rounded" src="/assets/logos/logo.png" badgePosition="top-left" badgeContent={<Badge icon={<Plus className="size-4" />} color="primary" />} />
      <Avatar variant="rounded" src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge icon={<Plus className="size-4" />} color="primary" />} />
    </div>
    <CustomSyntaxHighlighter content='<Avatar variant="rounded" src="/assets/logos/logo.png" badgePosition="bottom-left" badgeContent={<Badge icon={<Plus className="size-4" />} color="primary" />} />' />
  </div>

);

export default AvatarPage;
