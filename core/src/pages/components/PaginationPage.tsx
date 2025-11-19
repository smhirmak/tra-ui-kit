import { CaretDoubleLeftIcon, CaretDoubleRightIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import Button from '@/components/button';
import Pagination from '@/components/pagination-1';

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [visiblePages, setVisiblePages] = useState(6);

  return (
    <div className="space-y-8">
      <div>
        Total Page Number
        <span className="flex items-center gap-2 text-2xl font-semibold">
          <Button size="icon" rounded="lg" onClick={() => setTotalPages(prev => prev - 1)}><MinusIcon /></Button>
          {totalPages}
          <Button size="icon" rounded="lg" onClick={() => setTotalPages(prev => prev + 1)}><PlusIcon /></Button>
        </span>
      </div>
      <div>
        Visible Page Number
        <span className="flex items-center gap-2 text-2xl font-semibold">
          <Button size="icon" rounded="lg" onClick={() => setVisiblePages(prev => prev - 1)}><MinusIcon /></Button>
          {visiblePages}
          <Button size="icon" rounded="lg" onClick={() => setVisiblePages(prev => prev + 1)}><PlusIcon /></Button>
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-xl font-bold">Simple (With and Wtihout Arrow Buttons)</p>
        <div className="grid grid-cols-2 gap-4">
          <Pagination
            mode="simple"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
          />
          <Pagination
            mode="simple"
            simpleWithoutInput
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-xl font-bold">Solid Button (With and Wtihout Arrow Buttons)</p>
        <div className="grid grid-cols-2 gap-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            rounded="lg"
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            hideNavigationArrows
            hideFirstLastArrows
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
            hideNavigationArrows
            hideFirstLastArrows
          />
        </div>
        <p className="text-xl font-bold">Outlined Button (With and Wtihout Arrow Buttons)</p>
        <div className="grid grid-cols-2 gap-4">
          <Pagination
            variant="outlined"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
          />
          <Pagination
            variant="outlined"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
          />
          <Pagination
            variant="outlined"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            hideNavigationArrows
            hideFirstLastArrows
          />
          <Pagination
            variant="outlined"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
            hideNavigationArrows
            hideFirstLastArrows
          />
        </div>
        <p className="text-xl font-bold">Ghost Button (With and Wtihout Arrow Buttons)</p>
        <div className="grid grid-cols-2 gap-4">
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
          />
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
          />
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            hideNavigationArrows
            hideFirstLastArrows
          />
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
            hideNavigationArrows
            hideFirstLastArrows
          />
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            nextPageIcon={<PlusIcon />}
            previousPageIcon={<MinusIcon />}
          />
          <Pagination
            variant="ghost"
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisiblePages={visiblePages}
            color="secondary"
            rounded="lg"
            lastPageIcon={<CaretDoubleRightIcon />}
            firstPageIcon={<CaretDoubleLeftIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
