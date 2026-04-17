import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const preventScrollShift = {
  lock: () => {
    document.documentElement.style.scrollbarGutter = 'stable';
    document.body.style.overflow = 'hidden';
  },

  unlock: () => {
    document.body.style.overflow = '';
    document.documentElement.style.scrollbarGutter = '';
  },
};
