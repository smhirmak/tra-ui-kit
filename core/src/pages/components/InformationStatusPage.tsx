import { Plus } from '@phosphor-icons/react';
import InformationStatus from '@/components/InformationStatus';

const InformationStatusPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Information Status</p>
    <p className="mt-2 text-xl">Without Icon:</p>
    <div className="mt-2 flex space-x-2">
      <InformationStatus title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="warning" title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="error" title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
    </div>
    <p className="mt-2 text-xl">With Icon:</p>
    <div className="mt-2 flex space-x-2">
      <InformationStatus isHaveIcon title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="warning" isHaveIcon title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="error" isHaveIcon title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
    </div>
    <p className="mt-2 text-xl">With Custom Icon:</p>
    <div className="mt-2 flex space-x-2">
      <InformationStatus isHaveIcon icon={<Plus />} title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="warning" isHaveIcon icon={<Plus />} title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
      <InformationStatus type="error" isHaveIcon icon={<Plus />} title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit." />
    </div>
  </div>
);

export default InformationStatusPage;
