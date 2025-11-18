import React from 'react';
import SearchField from '@/components/search-field';

const SearchFieldPage = () => {
  const [value, setValue] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Search Bar</p>
      <div className="mt-2 space-y-2 border-t-2 py-2">
        <p className="my-2 text-xl">Small Solid:</p>
        <div className="flex space-x-2 pb-2">
          <SearchField value={value} onChange={handleChange} size="sm" />
          <SearchField value={value} onChange={handleChange} size="sm" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="sm" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="sm" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="sm" label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Small Outline:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} size="sm" variant="outlined" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="outlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="outlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="outlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="sm" variant="outlined" label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Small Underlined:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} size="sm" variant="underlined" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="underlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="underlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="sm" variant="underlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="sm" variant="underlined" label="TRA" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 space-y-2 border-t-2 py-2">
        <p className="my-2 text-xl">Default Solid:</p>
        <div className="flex space-x-2 pb-2">
          <SearchField value={value} onChange={handleChange} />
          <SearchField value={value} onChange={handleChange} label="TRA" />
          <SearchField value={value} onChange={handleChange} label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Default Outline:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} variant="outlined" />
          <SearchField value={value} onChange={handleChange} variant="outlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} variant="outlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} variant="outlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} variant="outlined" label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Default Underlined:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} variant="underlined" />
          <SearchField value={value} onChange={handleChange} variant="underlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} variant="underlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} variant="underlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} variant="underlined" label="TRA" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 space-y-2 border-t-2 py-2">
        <p className="my-2 text-xl">Large Solid:</p>
        <div className="flex space-x-2 pb-2">
          <SearchField value={value} onChange={handleChange} size="lg" />
          <SearchField value={value} onChange={handleChange} size="lg" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="lg" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="lg" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="lg" label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Large Outline:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} size="lg" variant="outlined" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="outlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="outlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="outlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="lg" variant="outlined" label="TRA" borderRadius="lg" />
        </div>
        <p className="my-2 text-xl">Large Underline:</p>
        <div className="flex space-x-2 pt-2">
          <SearchField value={value} onChange={handleChange} size="lg" variant="underlined" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="underlined" label="TRA" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="underlined" label="TRA" placeholder="Placeholder" />
          <SearchField value={value} onChange={handleChange} size="lg" variant="underlined" label="TRA" disabled />
          <SearchField value={value} onChange={handleChange} size="lg" variant="underlined" label="TRA" borderRadius="lg" />
        </div>
      </div>
    </div>
  );
};

export default SearchFieldPage;
