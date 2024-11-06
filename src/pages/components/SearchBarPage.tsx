import SearchBar from '@/components/SearchBar';
import React from 'react';

const SearchBarPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Search Bar</p>
    <div className="mt-2 space-y-2 border-t-2 py-2">
      <p className="my-2 text-xl">Small Solid:</p>
      <div className="flex space-x-2 pb-2">
        <SearchBar size="sm" />
        <SearchBar size="sm" label="TRA" />
        <SearchBar size="sm" label="TRA" placeholder="Placeholder" />
        <SearchBar size="sm" label="TRA" disabled />
        <SearchBar size="sm" label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Small Outline:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar size="sm" variant="outlined" />
        <SearchBar size="sm" variant="outlined" label="TRA" />
        <SearchBar size="sm" variant="outlined" label="TRA" placeholder="Placeholder" />
        <SearchBar size="sm" variant="outlined" label="TRA" disabled />
        <SearchBar size="sm" variant="outlined" label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Small Underlined:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar size="sm" variant="underlined" />
        <SearchBar size="sm" variant="underlined" label="TRA" />
        <SearchBar size="sm" variant="underlined" label="TRA" placeholder="Placeholder" />
        <SearchBar size="sm" variant="underlined" label="TRA" disabled />
        <SearchBar size="sm" variant="underlined" label="TRA" borderRadius="lg" />
      </div>
    </div>
    <div className="mt-2 space-y-2 border-t-2 py-2">
      <p className="my-2 text-xl">Default Solid:</p>
      <div className="flex space-x-2 pb-2">
        <SearchBar />
        <SearchBar label="TRA" />
        <SearchBar label="TRA" placeholder="Placeholder" />
        <SearchBar label="TRA" disabled />
        <SearchBar label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Default Outline:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar variant="outlined" />
        <SearchBar variant="outlined" label="TRA" />
        <SearchBar variant="outlined" label="TRA" placeholder="Placeholder" />
        <SearchBar variant="outlined" label="TRA" disabled />
        <SearchBar variant="outlined" label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Default Underlined:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar variant="underlined" />
        <SearchBar variant="underlined" label="TRA" />
        <SearchBar variant="underlined" label="TRA" placeholder="Placeholder" />
        <SearchBar variant="underlined" label="TRA" disabled />
        <SearchBar variant="underlined" label="TRA" borderRadius="lg" />
      </div>
    </div>
    <div className="mt-2 space-y-2 border-t-2 py-2">
      <p className="my-2 text-xl">Large Solid:</p>
      <div className="flex space-x-2 pb-2">
        <SearchBar size="lg" />
        <SearchBar size="lg" label="TRA" />
        <SearchBar size="lg" label="TRA" placeholder="Placeholder" />
        <SearchBar size="lg" label="TRA" disabled />
        <SearchBar size="lg" label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Large Outline:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar size="lg" variant="outlined" />
        <SearchBar size="lg" variant="outlined" label="TRA" />
        <SearchBar size="lg" variant="outlined" label="TRA" placeholder="Placeholder" />
        <SearchBar size="lg" variant="outlined" label="TRA" disabled />
        <SearchBar size="lg" variant="outlined" label="TRA" borderRadius="lg" />
      </div>
      <p className="my-2 text-xl">Large Underline:</p>
      <div className="flex space-x-2 pt-2">
        <SearchBar size="lg" variant="underlined" />
        <SearchBar size="lg" variant="underlined" label="TRA" />
        <SearchBar size="lg" variant="underlined" label="TRA" placeholder="Placeholder" />
        <SearchBar size="lg" variant="underlined" label="TRA" disabled />
        <SearchBar size="lg" variant="underlined" label="TRA" borderRadius="lg" />
      </div>
    </div>
  </div>
);

export default SearchBarPage;
