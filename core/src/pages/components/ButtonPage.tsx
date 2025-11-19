import { PlusIcon } from '@phosphor-icons/react';
import Button from '@/components/button';
import { CustomSyntaxHighlighter } from '../installation';

const ButtonPage = () => (
  <div>
    <p className="text-4xl underline">Button</p>
    <p className="mt-2 text-xl">Solid - Rounded Default:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="solid"><PlusIcon /></Button>
        <Button size="sm" variant="solid">TRA</Button>
        <Button size="default" variant="solid">TRA</Button>
        <Button size="lg" variant="solid">TRA</Button>
        <Button size="lg" variant="solid" disabled>TRA</Button>
        <Button size="icon" variant="solid" loading>TRA</Button>
        <Button size="sm" variant="solid" loading>TRA</Button>
        <Button size="default" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button size="lg" variant="solid" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="solid">TRA</Button>' />
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="solid" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="solid" color="secondary">TRA</Button>
        <Button size="sm" variant="solid" color="secondary">TRA</Button>
        <Button size="default" variant="solid" color="secondary">TRA</Button>
        <Button size="lg" variant="solid" color="secondary">TRA</Button>
        <Button size="lg" variant="solid" color="secondary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="solid" color="secondary">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="solid" color="tetriary">TRA</Button>
        <Button size="sm" variant="solid" color="tetriary">TRA</Button>
        <Button size="default" variant="solid" color="tetriary">TRA</Button>
        <Button size="lg" variant="solid" color="tetriary">TRA</Button>
        <Button size="lg" variant="solid" color="tetriary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="solid" color="tetriary">TRA</Button>' />
    </div>
    <p className="mt-2 text-xl">Solid - Rounded Large:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid"><PlusIcon /></Button>
        <Button rounded="lg" size="sm" variant="solid">TRA</Button>
        <Button rounded="lg" size="default" variant="solid">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" disabled>TRA</Button>
        <Button rounded="lg" size="icon" variant="solid" loading>TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" loading>TRA</Button>
        <Button rounded="lg" variant="solid" loading>TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="solid" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="default" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="secondary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="solid" color="secondary" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="default" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="tetriary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="solid" color="tetriary" loading loadingText="Changable Text">TRA</Button>' />
    </div>
    <p className="mt-2 text-xl">Outlined - Rounded Default:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined">TRA</Button>
        <Button size="sm" variant="outlined">TRA</Button>
        <Button size="default" variant="outlined">TRA</Button>
        <Button size="lg" variant="outlined">TRA</Button>
        <Button size="lg" variant="outlined" disabled>TRA</Button>
        <Button size="icon" variant="outlined" loading>TRA</Button>
        <Button size="sm" variant="outlined" loading>TRA</Button>
        <Button variant="outlined" loading>TRA</Button>
        <Button size="lg" variant="outlined" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="outlined" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined" color="secondary">TRA</Button>
        <Button size="sm" variant="outlined" color="secondary">TRA</Button>
        <Button size="default" variant="outlined" color="secondary">TRA</Button>
        <Button size="lg" variant="outlined" color="secondary">TRA</Button>
        <Button size="lg" variant="outlined" color="secondary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="outlined" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined" color="tetriary">TRA</Button>
        <Button size="sm" variant="outlined" color="tetriary">TRA</Button>
        <Button size="default" variant="outlined" color="tetriary">TRA</Button>
        <Button size="lg" variant="outlined" color="tetriary">TRA</Button>
        <Button size="lg" variant="outlined" color="tetriary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="outlined" color="tetriary" loading loadingText="Changable Text">TRA</Button>' />
    </div>
    <p className="mt-2 text-xl">Outlined - Rounded Large:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" disabled>TRA</Button>
        <Button rounded="lg" size="icon" variant="outlined" loading>TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" loading>TRA</Button>
        <Button rounded="lg" variant="outlined" loading>TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="outlined" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="secondary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="outlined" color="secondary" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="tetriary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button rounded="lg" size="lg" variant="outlined" color="tetriary" loading loadingText="Changable Text">TRA</Button>' />
    </div>
    <p className="mt-2 text-xl">Ghost:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost">TRA</Button>
        <Button size="sm" variant="ghost">TRA</Button>
        <Button size="default" variant="ghost">TRA</Button>
        <Button size="lg" variant="ghost">TRA</Button>
        <Button size="lg" variant="ghost" disabled>TRA</Button>
        <Button size="icon" variant="ghost" loading>TRA</Button>
        <Button size="sm" variant="ghost" loading>TRA</Button>
        <Button variant="ghost" loading>TRA</Button>
        <Button size="lg" variant="ghost" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="ghost" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost" color="secondary">TRA</Button>
        <Button size="sm" variant="ghost" color="secondary">TRA</Button>
        <Button size="default" variant="ghost" color="secondary">TRA</Button>
        <Button size="lg" variant="ghost" color="secondary">TRA</Button>
        <Button size="lg" variant="ghost" color="secondary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="ghost" color="secondary" loading loadingText="Changable Text">TRA</Button>' />
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost" color="tetriary">TRA</Button>
        <Button size="sm" variant="ghost" color="tetriary">TRA</Button>
        <Button size="default" variant="ghost" color="tetriary">TRA</Button>
        <Button size="lg" variant="ghost" color="tetriary">TRA</Button>
        <Button size="lg" variant="ghost" color="tetriary" loading loadingText="Changable Text">TRA</Button>
      </div>
      <CustomSyntaxHighlighter className="block w-full" content='<Button size="lg" variant="ghost" color="tetriary" loading loadingText="Changable Text">TRA</Button>' />
    </div>
  </div>
);

export default ButtonPage;
