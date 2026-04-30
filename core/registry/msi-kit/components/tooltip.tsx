import { cva } from 'class-variance-authority';
import React, { useEffect, useRef, useState } from 'react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface ITooltip {
  content: string | Array<string>;
  position?: TooltipPosition;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
}

const arrowVariants = cva('absolute size-0 border-[5px] border-transparent', {
  variants: {
    tooltipPosition: {
      top: 'left-1/2 top-full -translate-x-1/2 border-t-neutral-black',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-black',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-neutral-black',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-neutral-black',
    },
  },
});

const Tooltip: React.FC<ITooltip> = ({
  content,
  position = 'top',
  children,
  delay = 200,
  className = '',
  contentClassName = '',
  arrow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    timeoutId.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    setIsVisible(false);
  };

  useEffect(() => {
    const updatePosition = () => {
      if (tooltipRef.current && targetRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;

        let newPosition = position;
        if (position === 'bottom' && targetRect.bottom + tooltipRect.height > innerHeight) {
          newPosition = 'top';
        } else if (position === 'top' && targetRect.top - tooltipRect.height < 0) {
          newPosition = 'bottom';
        } else if (position === 'right' && targetRect.right + tooltipRect.width > innerWidth) {
          newPosition = 'left';
        } else if (position === 'left' && targetRect.left - tooltipRect.width < 0) {
          newPosition = 'right';
        }

        setTooltipPosition(newPosition);
      }
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isVisible, position]);

  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (tooltipPosition) {
        case 'top':
          top = -tooltipRect.height - 10;
          left = targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'bottom':
          top = targetRect.height + 10;
          left = targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = targetRect.height / 2 - tooltipRect.height / 2;
          left = -tooltipRect.width - 10;
          break;
        case 'right':
          top = targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.width + 10;
          break;
        default:
          break;
      }

      setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    }
  }, [isVisible, tooltipPosition]);

  return (
    <div
      className={`relative inline-block w-fit ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={targetRef}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 max-w-[200px] wrap-break-word rounded-md bg-neutral-black px-3 py-2 text-sm text-neutral-white shadow-md ${contentClassName}`}
          ref={tooltipRef}
          style={tooltipStyle}
        >
          {Array.isArray(content) ? (
            <ul className="m-0 list-none space-y-1 p-0">
              {content.map((item, index) => (
                <li
                  className="w-max"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            content
          )}
          {arrow && <div className={arrowVariants({ tooltipPosition })} />}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
