import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const defaultTabsContext = {
  activeTab: '',
  handleTabClick: () => { },
  variant: 'default',
};

const TabsContext = createContext(defaultTabsContext);

const tabsContainerVariants = cva('flex h-fit gap-2', {
  variants: {
    contentPlacement: {
      top: 'flex-col-reverse',
      right: 'flex-row',
      bottom: 'flex-col',
      left: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    contentPlacement: 'bottom',
  },
});

const tabsVariants = cva('inline-flex w-fit items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-transparent shadow-md',
      solid: 'bg-neutral-light p-1',
      outlined: 'border-2 bg-transparent p-1',
      split: 'bg-transparent',
    },
    radius: {
      default: 'rounded-md',
      none: 'rounded-none',
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    radius: 'default',
  },
});

const tabVariants = cva(
  'select-none font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      isActive: {
        true: 'active-tab',
        false: '',
      },
      variant: {
        default: 'border-b-2',
        solid: 'relative z-20',
        outlined: 'relative z-20',
        split: 'relative z-20',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-4 py-2 text-sm',
        lg: 'px-6 py-4',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        isActive: true,
        className: 'border-primary text-primary',
      },
      {
        variant: 'default',
        isActive: false,
        className: 'border-neutral text-neutral-grey hover:brightness-75',
      },
      {
        variant: 'solid',
        isActive: true,
        className: 'text-neutral-black hover:text-neutral-black/80',
      },
      {
        variant: 'solid',
        isActive: false,
        className: 'text-neutral-black/90 hover:text-neutral-grey/60',
      },
      {
        variant: 'outlined',
        isActive: true,
        className: 'text-neutral-black hover:text-neutral-black/80',
      },
      {
        variant: 'outlined',
        isActive: false,
        className: 'text-neutral-black/90 hover:text-neutral-grey/60',
      },
      {
        variant: 'split',
        isActive: true,
        className: 'text-neutral-black hover:text-neutral-black/80',
      },
      {
        variant: 'split',
        isActive: false,
        className: 'text-neutral-black/90 hover:text-neutral-grey/60',
      },
    ],
    defaultVariants: {
      variant: 'default',
      isActive: false,
      size: 'default',
    },
  },
);

const selectorVariants = cva('absolute transition-transform duration-200', {
  variants: {
    variant: {
      default: 'bg-primary h-[2px]',
      solid: 'bg-neutral-white z-10 h-full',
      outlined: 'bg-neutral dark:bg-neutral-white z-10 h-full',
      split: 'bg-neutral dark:bg-neutral-white z-10 h-full',
    },
    disabled: {
      true: 'pointer-events-none opacity-50',
      false: '',
    },
    radius: {
      default: 'rounded-md',
      none: 'rounded-none',
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    direction: {
      horizontal: 'bottom-0',
      vertical: 'top-0',
    },
  },

  defaultVariants: {
    variant: 'default',
    disabled: false,
    radius: 'default',
    direction: 'horizontal',
  },
});

const Tabs = ({ activeTab, variant = 'default', onChange, className, contentClasName,
  selectorClassName, children, disabled, size = 'default', radius = 'default', direction = 'horizontal', contentPlacement = 'bottom' }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef(null);

  const labels = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map(child => child.props.label);

  useEffect(() => {
    const activeTabElement = tabsRef.current?.querySelector('.active-tab');

    if (activeTabElement && variant !== 'default') {
      const newIndicatorStyle = {
        width: direction === 'horizontal' ? activeTabElement.offsetWidth : '100%',
        height: direction === 'vertical' ? activeTabElement.offsetHeight : '100%',
        // transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${-activeTabElement.offsetTop}px)`,
        transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${activeTabElement.offsetTop}px)`,
      };
      setIndicatorStyle(newIndicatorStyle);
    }
  }, [activeTab, direction, contentPlacement, labels]);

  const handleTabClick = (value) => {
    if (onChange) onChange(value);
  };

  const contextValue = React.useMemo(() => ({ activeTab, handleTabClick, variant }), [activeTab, variant]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn(tabsContainerVariants({ contentPlacement }))}>
        <div className={cn(tabsVariants({ variant, radius }), className)}>
          <div className={cn(direction === 'horizontal' ? 'flex-row' : 'flex-col', 'relative flex')} ref={tabsRef}>
            <div
              className={cn(selectorVariants({ variant, disabled, radius, direction }), selectorClassName)}
              style={indicatorStyle}
            />
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  isActive: child.props.value === activeTab,
                  onClick: () => handleTabClick(child.props.value),
                  allDisabled: disabled,
                  size,
                });
              }
              return null;
            })}
          </div>
        </div>
        {/* Content */}
        <div>
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.props.value === activeTab) {
              return <div className={contentClasName}>{child.props.children}</div>;
            }
            return null;
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

const Tab = ({ className, label, value, onClick, disabled, allDisabled, size }) => {
  const context = useContext(TabsContext);

  // If Tab is used without a Tabs component, throw an error
  if (!context) {
    throw new Error('Tab component must be used within a Tabs component');
  }

  const { activeTab, handleTabClick } = context;
  const isActive = value === activeTab;

  return (
    <button
      type="button"
      disabled={disabled || allDisabled}
      className={cn(
        tabVariants({ isActive, variant: context.variant || 'default', size }),
        className,
      )}
      onClick={onClick || (() => handleTabClick(value))}
    >
      {label}
    </button>
  );
};

export { Tabs, Tab };
