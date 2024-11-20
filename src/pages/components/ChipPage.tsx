import { Plus } from '@/assets/Icons';
import Chip from '@/components/Chip';

const ChipPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Chip</p>
    <p className="mt-2 text-xl">Small:</p>
    <div className="mt-2 flex flex-col space-x-2">
      <div className="mt-2 flex space-x-2">
        <Chip size="sm" />
        <Chip size="sm" active />
        <Chip size="sm" selected />
        <Chip size="sm" label="TRA" />
        <Chip size="sm" label="TRA" active />
        <Chip size="sm" label="TRA" selected />
        <Chip size="sm" label="TRA" startIcon={<Plus />} />
        <Chip size="sm" label="TRA" active startIcon={<Plus />} />
        <Chip size="sm" label="TRA" selected startIcon={<Plus />} />
      </div>
      <div className="mt-2 flex space-x-2">
        <Chip size="sm" label="TRA" endIcon={<Plus />} />
        <Chip size="sm" label="TRA" active endIcon={<Plus />} />
        <Chip size="sm" label="TRA" selected endIcon={<Plus />} />
        <Chip size="sm" label="TRA" onDelete={() => { }} />
        <Chip size="sm" label="TRA" active onDelete={() => { }} />
        <Chip size="sm" label="TRA" selected onDelete={() => { }} />
        <Chip size="sm" label="TRA" onClick={() => { }} />
        <Chip size="sm" label="TRA" active onClick={() => { }} />
        <Chip size="sm" label="TRA" selected onClick={() => { }} />
      </div>
    </div>
    <p className="mt-2 text-xl">Default:</p>
    <div className="mt-2 flex flex-col space-x-2">
      <div className="mt-2 flex space-x-2">
        <Chip />
        <Chip active />
        <Chip selected />
        <Chip label="TRA" />
        <Chip label="TRA" active />
        <Chip label="TRA" selected />
        <Chip label="TRA" startIcon={<Plus />} />
        <Chip label="TRA" active startIcon={<Plus />} />
        <Chip label="TRA" selected startIcon={<Plus />} />
        <Chip label="TRA" endIcon={<Plus />} />
      </div>
      <div className="mt-2 flex space-x-2">
        <Chip label="TRA" active endIcon={<Plus />} />
        <Chip label="TRA" selected endIcon={<Plus />} />
        <Chip label="TRA" onDelete={() => { }} />
        <Chip label="TRA" active onDelete={() => { }} />
        <Chip label="TRA" selected onDelete={() => { }} />
        <Chip label="TRA" onClick={() => { }} />
        <Chip label="TRA" active onClick={() => { }} />
        <Chip label="TRA" selected onClick={() => { }} />
      </div>
    </div>
    <p className="mt-2 text-xl">Large:</p>
    <div className="mt-2 flex flex-col space-x-2">
      <div className="mt-2 flex space-x-2">
        <Chip />
        <Chip size="lg" active />
        <Chip size="lg" selected />
        <Chip size="lg" label="TRA" />
        <Chip size="lg" label="TRA" active />
        <Chip size="lg" label="TRA" selected />
        <Chip size="lg" label="TRA" startIcon={<Plus />} />
        <Chip size="lg" label="TRA" active startIcon={<Plus />} />
        <Chip size="lg" label="TRA" selected startIcon={<Plus />} />
        <Chip size="lg" label="TRA" endIcon={<Plus />} />
      </div>
      <div className="mt-2 flex space-x-2">
        <Chip size="lg" label="TRA" active endIcon={<Plus />} />
        <Chip size="lg" label="TRA" selected endIcon={<Plus />} />
        <Chip size="lg" label="TRA" onDelete={() => { }} />
        <Chip size="lg" label="TRA" active onDelete={() => { }} />
        <Chip size="lg" label="TRA" selected onDelete={() => { }} />
        <Chip size="lg" label="TRA" onClick={() => { }} />
        <Chip size="lg" label="TRA" active onClick={() => { }} />
        <Chip size="lg" label="TRA" selected onClick={() => { }} />
      </div>
    </div>
  </div>
);

export default ChipPage;
