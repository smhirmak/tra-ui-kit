import React, { ReactNode, useState, useEffect, useRef, useContext, createContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{ activeTab: string; handleTabClick:(value: string) => void; variant: 'default' | 'solid' | 'outlined' | 'split' } | undefined>(undefined);

interface TabsProps {
  activeTab: string;
  variant?: 'default' | 'solid' | 'outlined' | 'split';
  onChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg';
  radius?: 'default' | 'none' | 'sm' | 'lg' | 'full';
  selectorClassName?: string;
  direction?: 'horizontal' | 'vertical';
}

interface TabProps {
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

const tabsContainerVariants = cva('relative flex w-fit', {
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
});

const tabsVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-transparent shadow-md',
      solid: 'bg-tra-neutral-light p-1',
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

// Updated tabVariants with new solid variant
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
        className: 'border-tra-primary text-tra-primary',
      },
      {
        variant: 'default',
        isActive: false,
        className: 'border-tra-neutral text-tra-neutral-grey hover:brightness-75',
      },
      {
        variant: 'solid',
        isActive: true,
        className: 'text-tra-neutral-black hover:text-tra-neutral-black/80',
      },
      {
        variant: 'solid',
        isActive: false,
        className: 'text-tra-neutral-black/90 hover:text-tra-neutral-grey/60',
      },
      {
        variant: 'outlined',
        isActive: true,
        className: 'text-tra-neutral-black hover:text-tra-neutral-black/80',
      },
      {
        variant: 'outlined',
        isActive: false,
        className: 'text-tra-neutral-black/90 hover:text-tra-neutral-grey/60',
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
      default: 'h-[2px] bg-tra-primary',
      solid: 'z-10 h-full bg-tra-neutral-white',
      outlined: 'z-10 h-full bg-tra-neutral-white',
      split: 'z-10 h-full bg-tra-neutral-white',
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

const Tabs: React.FC<TabsProps> = ({ activeTab, variant = 'default', onChange, className, selectorClassName, children, disabled, size = 'default', radius = 'default', direction = 'horizontal' }) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabElement = tabsRef.current?.querySelector('.active-tab') as HTMLButtonElement;

    if (activeTabElement && variant !== 'default') {
      const newIndicatorStyle = {
        width: direction === 'horizontal' ? activeTabElement.offsetWidth : '100%',
        height: direction === 'vertical' ? activeTabElement.offsetHeight : '100%',
        // transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${-activeTabElement.offsetTop}px)`,
        transform: direction === 'horizontal' ? `translateX(${activeTabElement.offsetLeft}px)` : `translateY(${activeTabElement.offsetTop}px)`,
      };
      setIndicatorStyle(newIndicatorStyle);
    }
  }, [activeTab, direction]);

  const handleTabClick = (value: string) => {
    if (onChange) onChange(value);
  };

  const contextValue = React.useMemo(() => ({ activeTab, handleTabClick, variant }), [activeTab, variant]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn()}>
        <div className={cn(tabsVariants({ variant, radius }), className)}>
          <div className={cn(direction === 'horizontal' ? 'flex-row' : 'flex-col', 'relative flex')} ref={tabsRef}>
            <div
              className={cn(selectorVariants({ variant, disabled, radius, direction }), selectorClassName)}
              style={indicatorStyle}
            />
            {React.Children.map(children, child => {
              if (React.isValidElement<TabProps>(child)) {
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
        {/* İçerik alanı buraya gelecek */}
        <div className="mt-4">
          {React.Children.map(children, child => {
            if (React.isValidElement<TabProps>(child) && child.props.value === activeTab) {
              return <div>{child.props.children}</div>;
            }
            return null;
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

const Tab: React.FC<TabProps> = ({ className, label, value, onClick, disabled, allDisabled, size }) => {
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
