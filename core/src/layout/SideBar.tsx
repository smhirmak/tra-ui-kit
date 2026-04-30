import { CaretRightIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Accordion, AccordionItem } from '@/components/accordion';
import Button from '@/components/button';
import Constants from '@/constants/Constants';

const SideBar = () => {
  const location = useRouterState({ select: (s) => s.location });
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`sticky left-0 top-0 flex max-h-screen min-h-screen ${open ? 'min-w-36' : 'max-w-16'} bg-background flex-col overflow-y-auto p-4`}
    >
      <Button
        className="text-neutral-black self-end overflow-visible bg-transparent hover:bg-transparent"
        size="icon"
        disableEffect
        onClick={() => setOpen((prev) => !prev)}
      >
        <CaretRightIcon className={`transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </Button>
      {open && (
        <>
          <Link
            to={'/installation' as any}
            className={`hover:bg-primary-5 mt-1 rounded-md px-4 text-lg font-medium transition-colors duration-100 ${location.pathname === '/installation' && 'bg-primary/10 text-primary'}`}
          >
            Installation
          </Link>
          <Accordion multipleExpand>
            <AccordionItem
              title="Components"
              defaultOpen
              contentClassName="flex flex-col"
            >
              {Constants.componentList
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((e, index) => (
                  <React.Fragment key={index}>
                    {'child' in e && Array.isArray((e as any).child) ? (
                      <Accordion multipleExpand>
                        {/* <AccordionTrigger title={e.label} /> */}
                        <AccordionItem
                          triggerClassName="p-2"
                          titleClassName="text-base!"
                          title={e.name}
                          contentClassName="flex flex-col"
                        >
                          {(e.child as any[]).map((c) => (
                            <Link
                              key={c.path}
                              to={c.path as any}
                              className={`hover:bg-primary-5 mt-1 rounded-t-md p-2 text-base transition-colors  duration-100 ${location.pathname === c.path && 'bg-primary/10 text-primary'}`}
                            >
                              {c.name}
                            </Link>
                          ))}
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        to={e.path as any}
                        className={`hover:bg-primary-5 mt-1 rounded-t-md p-2 transition-colors  duration-100 ${location.pathname === e.path && 'bg-primary/10 text-primary'}`}
                      >
                        {e.name}
                      </Link>
                    )}
                    <span className="border-primary-15 h-1 w-full border-b-2 last:border-b-0" />
                  </React.Fragment>
                ))}
            </AccordionItem>
            <AccordionItem title="Components Api">Deneme</AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default SideBar;
