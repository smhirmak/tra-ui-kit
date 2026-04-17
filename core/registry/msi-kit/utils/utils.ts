import {  clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type {ClassValue} from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
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
