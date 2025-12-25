import React, { useState, useEffect, useRef, useContext, createContext, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface ITabsContext {
  activeTab: string;
  handleTabClick: (value: string) => void;
  variant: 'default' | 'solid' | 'outlined' | 'split';
}

const defaultTabsContext: ITabsContext = {
  activeTab: '',
  handleTabClick: () => { },
  variant: 'default',
};

const TabsContext = createContext<ITabsContext>(defaultTabsContext);

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
      default: 'bg-transparent shadow-md rounded-none!',
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

// eslint-disable-next-line tailwindcss/no-custom-classname
const tabVariants = cva(
  'select-none font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      isActive: {
        true: 'active-tab',
        false: '',
      },
      variant: {
        default: 'relative z-20',
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
        // className: 'border-primary text-primary',
        className: 'text-primary hover:text-primary/80',
      },
      {
        variant: 'default',
        isActive: false,
        // className: 'border-neutral text-neutral-grey hover:brightness-75',
        className: 'text-neutral hover:text-neutral/80',
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
      default: 'bg-primary z-30 rounded-md',
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

  compoundVariants: [
    {
      variant: 'default',
      direction: 'vertical',
      className: '-left-[1.5px]!',
    },
    {
      variant: 'default',
      direction: 'horizontal',
      className: '-bottom-[1.5px]!',
    },
  ]
});

interface ITabsBase {
  variant?: 'default' | 'solid' | 'outlined' | 'split';
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg';
  radius?: 'default' | 'none' | 'sm' | 'lg' | 'full';
  selectorClassName?: string;
  direction?: 'horizontal' | 'vertical';
  contentPlacement?: 'top' | 'bottom' | 'left' | 'right';
  contentClasName?: string;
}

// Controlled mode: activeTab and onChange are required
interface ITabsControlled extends ITabsBase {
  activeTab: string;
  onChange: (value: string) => void;
  defaultActiveTab?: never;
}

// Uncontrolled mode: activeTab and onChange are optional, defaultActiveTab can be used
interface ITabsUncontrolled extends ITabsBase {
  activeTab?: never;
  onChange?: (value: string) => void;
  defaultActiveTab?: string;
}

type ITabs = ITabsControlled | ITabsUncontrolled;

interface ITab {
  label: string | ReactNode;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  allDisabled?: boolean;
  size?: 'default' | 'sm' | 'lg';
  radius?: 'default' | 'none' | 'sm' | 'lg' | 'full';
}

const Tabs: React.FC<ITabs> = ({ activeTab: externalActiveTab, variant = 'default', onChange, className, contentClasName,
  selectorClassName, children, disabled, size = 'default', radius = 'default', direction = 'horizontal', contentPlacement = 'bottom', defaultActiveTab }) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const [internalActiveTab, setInternalActiveTab] = useState<string>(() => {
    if (defaultActiveTab) return defaultActiveTab;
    const firstTab = React.Children.toArray(children).find(
      child => React.isValidElement<ITab>(child)
    ) as React.ReactElement<ITab> | undefined;
    return firstTab?.props.value || '';
  });

  const isControlled = externalActiveTab !== undefined;
  const activeTab = isControlled ? externalActiveTab : internalActiveTab;

  useEffect(() => {
    const activeTabElement = tabsRef.current?.querySelector('.active-tab') as HTMLButtonElement;

    // if (activeTabElement && variant !== 'default') {
    if (activeTabElement) {
      const newIndicatorStyle = {
        width: (variant === 'default' && direction === 'vertical') ? '2px' : direction === 'horizontal' ? activeTabElement.offsetWidth : '100%',
        height: (variant === 'default' && direction === 'horizontal') ? '2px' : direction === 'vertical' ? activeTabElement.offsetHeight : '100%',
        // transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${-activeTabElement.offsetTop}px)`,
        transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${activeTabElement.offsetTop}px)`,
      };
      setIndicatorStyle(newIndicatorStyle);
    }
  }, [activeTab, direction, variant]);

  const handleTabClick = (value: string) => {
    if (isControlled) {
      if (onChange) onChange(value);
    } else {
      setInternalActiveTab(value);
      if (onChange) onChange(value);
    }
  };

  const contextValue = React.useMemo(() => ({ activeTab, handleTabClick, variant }), [activeTab, variant]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn(tabsContainerVariants({ contentPlacement }))}>
        <div className={cn(tabsVariants({ variant, radius }), className)}>
          <div className={cn(direction === 'horizontal' ? 'flex-row' : 'flex-col',
            variant === 'default' && direction === 'horizontal' && 'border-b-2 border-neutral-light',
            variant === 'default' && direction === 'vertical' && 'border-l-2 border-neutral-light',
            'relative flex')} ref={tabsRef}>
            <div
              className={cn(selectorVariants({ variant, disabled, radius, direction }), selectorClassName)}
              style={indicatorStyle}
            />
            {React.Children.map(children, child => {
              if (React.isValidElement<ITab>(child)) {
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
        <div>
          {React.Children.map(children, child => {
            if (React.isValidElement<ITab>(child) && child.props.value === activeTab) {
              return <div className={contentClasName}>{child.props.children}</div>;
            }
            return null;
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

const Tab: React.FC<ITab> = ({ className, label, value, onClick, disabled, allDisabled, size }) => {
  const context = useContext(TabsContext);

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
