import { Plus } from '@/assets/Icons';
import Button from '@/components/Button';

const ButtonPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Button</p>
    <p className="mt-2 text-xl">Solid - Rounded Default:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="solid"><Plus /></Button>
        <Button size="sm" variant="solid">TRA</Button>
        <Button size="default" variant="solid">TRA</Button>
        <Button size="lg" variant="solid">TRA</Button>
        <Button size="lg" variant="solid" disabled>TRA</Button>
        <Button size="icon" variant="solid" loading>TRA</Button>
        <Button size="sm" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button size="default" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button size="lg" variant="solid" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="solid" color="secondary">TRA</Button>
        <Button size="sm" variant="solid" color="secondary">TRA</Button>
        <Button size="default" variant="solid" color="secondary">TRA</Button>
        <Button size="lg" variant="solid" color="secondary">TRA</Button>
        <Button size="lg" variant="solid" color="secondary" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="solid" color="tetriary">TRA</Button>
        <Button size="sm" variant="solid" color="tetriary">TRA</Button>
        <Button size="default" variant="solid" color="tetriary">TRA</Button>
        <Button size="lg" variant="solid" color="tetriary">TRA</Button>
        <Button size="lg" variant="solid" color="tetriary" loading loadingText="Sending">TRA</Button>
      </div>
    </div>
    <p className="mt-2 text-xl">Solid - Rounded Large:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid"><Plus /></Button>
        <Button rounded="lg" size="sm" variant="solid">TRA</Button>
        <Button rounded="lg" size="default" variant="solid">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" disabled>TRA</Button>
        <Button rounded="lg" size="icon" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" variant="solid" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="default" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="secondary" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="sm" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="default" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="solid" color="tetriary" loading loadingText="Sending">TRA</Button>
      </div>
    </div>
    <p className="mt-2 text-xl">Outlined - Rounded Default:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined">TRA</Button>
        <Button size="sm" variant="outlined">TRA</Button>
        <Button size="default" variant="outlined">TRA</Button>
        <Button size="lg" variant="outlined">TRA</Button>
        <Button size="lg" variant="outlined" disabled>TRA</Button>
        <Button size="icon" variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button size="sm" variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button size="lg" variant="outlined" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined" color="secondary">TRA</Button>
        <Button size="sm" variant="outlined" color="secondary">TRA</Button>
        <Button size="default" variant="outlined" color="secondary">TRA</Button>
        <Button size="lg" variant="outlined" color="secondary">TRA</Button>
        <Button size="lg" variant="outlined" color="secondary" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="outlined" color="tetriary">TRA</Button>
        <Button size="sm" variant="outlined" color="tetriary">TRA</Button>
        <Button size="default" variant="outlined" color="tetriary">TRA</Button>
        <Button size="lg" variant="outlined" color="tetriary">TRA</Button>
        <Button size="lg" variant="outlined" color="tetriary" loading loadingText="Sending">TRA</Button>
      </div>
    </div>
    <p className="mt-2 text-xl">Outlined - Rounded Large:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" disabled>TRA</Button>
        <Button rounded="lg" size="icon" variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" variant="outlined" loading loadingText="Sending">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="secondary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="secondary" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button rounded="lg" size="icon" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="sm" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="default" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="tetriary">TRA</Button>
        <Button rounded="lg" size="lg" variant="outlined" color="tetriary" loading loadingText="Sending">TRA</Button>
      </div>
    </div>
    <p className="mt-2 text-xl">Ghost:</p>
    <div className="mt-2 flex flex-col space-y-2">
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost">TRA</Button>
        <Button size="sm" variant="ghost">TRA</Button>
        <Button size="default" variant="ghost">TRA</Button>
        <Button size="lg" variant="ghost">TRA</Button>
        <Button size="lg" variant="ghost" disabled>TRA</Button>
        <Button size="icon" variant="ghost" loading loadingText="Sending">TRA</Button>
        <Button size="sm" variant="ghost" loading loadingText="Sending">TRA</Button>
        <Button variant="ghost" loading loadingText="Sending">TRA</Button>
        <Button size="lg" variant="ghost" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost" color="secondary">TRA</Button>
        <Button size="sm" variant="ghost" color="secondary">TRA</Button>
        <Button size="default" variant="ghost" color="secondary">TRA</Button>
        <Button size="lg" variant="ghost" color="secondary">TRA</Button>
        <Button size="lg" variant="ghost" color="secondary" loading loadingText="Sending">TRA</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="icon" variant="ghost" color="tetriary">TRA</Button>
        <Button size="sm" variant="ghost" color="tetriary">TRA</Button>
        <Button size="default" variant="ghost" color="tetriary">TRA</Button>
        <Button size="lg" variant="ghost" color="tetriary">TRA</Button>
        <Button size="lg" variant="ghost" color="tetriary" loading loadingText="Sending">TRA</Button>
      </div>
    </div>
  </div>
);

export default ButtonPage;
