import { CaretRight } from '@/assets/Icons';
import { Accordion, AccordionItem } from '@/components/Accordion';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarList = [
  // {
  //   label: 'Home',
  //   link: '/',
  // },
  {
    label: 'Avatar',
    link: '/avatar',
  },
  {
    label: 'Badge',
    link: '/badge',
  },
  {
    label: 'Button',
    link: '/button',
  },
  {
    label: 'Checkbox',
    link: '/checkbox',
  },
  {
    label: 'Chip',
    link: '/chip',
  },
  {
    label: 'Information Status',
    link: '/information-status',
  },
  {
    label: 'Loader',
    link: '/loader',
  },
  {
    label: 'Text Field',
    link: '/text-field',
    child: [
      {
        label: 'Filled',
        link: '/text-field/filled',
      },
      {
        label: 'Outlined',
        link: '/text-field/outlined',
      },
      {
        label: 'Underlined',
        link: '/text-field/underlined',
      },
      {
        label: 'Filled Underlined',
        link: '/text-field/filled-underlined',
      },
    ],
  },
  {
    label: 'Notification',
    link: '/notification',
  },
  {
    label: 'Radio Button',
    link: '/radio-button',
  },
  {
    label: 'Search Bar',
    link: '/search-bar',
  },
  {
    label: 'Skeleton',
    link: '/skeleton',
  },
  {
    label: 'Switch',
    link: '/switch',
  },
  {
    label: 'Tabs',
    link: '/tabs',
  },
  {
    label: 'Background Video',
    link: '/background-video',
  },
  {
    label: 'Image Hover Effect',
    link: '/image-hover-effect',
  },
  {
    label: 'Accordion',
    link: '/accordion',
  },
  {
    label: 'Select',
    link: '/select',
  },
  {
    label: 'Tooltip',
    link: '/tooltip',
  },
  {
    label: 'Date Picker',
    link: '/date-picker',
  },
  {
    label: 'Popover',
    link: '/popover',
  },
  {
    label: 'Dialog',
    link: '/dialog',
  },
  {
    label: 'Drawer',
    link: '/drawer',
  },
  {
    label: 'Pagination',
    link: '/pagination',
  },
  {
    label: 'Table',
    link: '/table',
  },
  {
    label: 'Progress Bar',
    link: '/progress-bar',
  },
];

const SideBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className={`sticky left-0 top-0 flex max-h-screen min-h-screen ${open ? 'min-w-36' : 'max-w-16'} flex-col overflow-y-auto bg-tra-background p-4`}>
      <Button className="self-end overflow-visible bg-transparent text-tra-neutral-black hover:bg-transparent" size="icon" disableEffect onClick={() => setOpen(prev => !prev)}>
        <CaretRight className={`transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </Button>
      {open && (
        <Accordion multipleExpand>
          <AccordionItem title="Components" defaultOpen contentClassName="flex flex-col">
            {sidebarList.sort((a, b) => a.label.localeCompare(b.label)).map((e, index) => (
              <React.Fragment key={index}>
                {e.child ? (
                  <Accordion multipleExpand>
                    {/* <AccordionTrigger title={e.label} /> */}
                    <AccordionItem triggerClassName="p-2" titleClassName="!text-base" title={e.label} contentClassName="flex flex-col">
                      {e.child.map(c => (
                        <Link
                          key={c.link}
                          to={c.link}
                          className={`mt-1 rounded-t-md p-2 text-base transition-colors duration-100  hover:bg-tra-primary-5 ${location.pathname === c.link && 'bg-tra-primary/10 text-tra-primary'}`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link to={e.link} className={`mt-1 rounded-t-md p-2 transition-colors duration-100  hover:bg-tra-primary-5 ${location.pathname === e.link && 'bg-tra-primary/10 text-tra-primary'}`}>
                    {e.label}
                  </Link>
                )}
                <span className="h-1 w-full border-b-2 border-tra-primary-15 last:border-b-0" />
              </React.Fragment>
            ))}
          </AccordionItem>
          <AccordionItem title="Components Api">
            Deneme
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default SideBar;
