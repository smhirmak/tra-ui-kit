/* eslint-disable @typescript-eslint/no-explicit-any */
import { buttonVariants } from '@/components/Button';
import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { containerVariants } from '@/components/Container';
import { inputVariants } from '@/components/Input';
import { labelVariants } from '@/components/Label';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SwitchPrimitives from '@radix-ui/react-switch';

export interface INotification {
  children: ReactNode;
  newestTop?: boolean,
  closeIcon?: boolean,
  translateFunction?: (e: string | string[]) => void,
  theme?: 'colored' | 'default' | 'lined',
  mode?: 'light' | 'dark',
  containerClassName?: string,
  notificationClassName?: string,
  closeButtonClassName?: string,
  progressBarClassName?: string,
  animationMode?: 'bounce' | 'slide' | 'flip' | false,
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left',
}

export interface IAvatar {
  asChild?: React.ElementType;
  badgeClassName?: string;
  badgeContent?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  imageClassName?: string;
  onClick?: () => void;
  size?: 'sm' | 'lg';
  src?: string;
  title?: string;
  variant?: 'circular' | 'rounded';
}

export interface IMultipleAvatarContainer {
  children: React.ReactNode[];
  lastElementSize?: 'sm' | 'lg';
  showLessAvatarClassName?: string;
  showMoreAvatarClassName?: string;
}

export interface IBackgroundVideo {
  videoSrc: string;
  posterImg?: string;
  className?: string;
  [key: string]: any;
}

export interface IBackToTopButton {
  buttonClassName?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
}

export interface IBadge {
  className?: string;
  color?: 'primary' | 'secondary' | 'tetriary' | 'error' | 'success' | 'warning';
  icon?: React.ReactNode;
  size?: 'default' | 'sm' | 'lg';
  text?: string;
  variant?: 'circular' | 'rectangular';
}

export interface IButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'tetriary';
  disabled?: boolean;
  disableEffect?: boolean;
  effectColor?: string;
  effectOpacity?: string;
  loading?: boolean;
  loadingSpinnerClassname?: string;
  loadingText?: string;
  rounded?: 'default' | 'lg';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'solid' | 'outlined' | 'ghost';
}

export type CheckboxProps = {
  className?: string;
  disabled?: boolean;
  id?: string
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'rectangular' | 'circular';
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export interface IChip {
  active?: boolean;
  deleteIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  id?: string;
  label?: string;
  labelClassName?: string;
  onClick?: (e: string | number | undefined | null) => void;
  onDelete?: (e: string | number | undefined | null) => void;
  selected?: boolean;
  size?: 'default' | 'sm' | 'lg';
  startIcon?: React.ReactNode;
}

export interface IContainer extends VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
}

export interface IInformationStatus {
  className?: string;
  icon?: React.ReactNode;
  isHaveIcon?: boolean;
  title: string;
  type?: 'success' | 'error' | 'warning';
}

export interface IInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {
  borderRadius?: 'default' | 'lg';
  className?: string;
  endIcon?: React.ReactNode;
  error?: boolean | null | undefined;
  size?: 'default' | 'sm' | 'lg' | undefined;
  startIcon?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string | number;
}

export interface ILabel
extends VariantProps<typeof labelVariants> {
alwaysTop?: boolean;
borderRadius?: 'default' | 'lg';
className?: string;
children?: React.ReactNode;
disabled?: boolean;
htmlFor?: string;
id?: string;
outlineFocused?: boolean;
showRequiredIcon?: boolean;
size?: 'sm' | 'default' | 'lg' | undefined;
startIcon?: React.ReactNode;
tooltip?: string | string[];
variant?: 'filled' | 'outlined' | 'underlined';
}

export interface ILanguangeSelect {
  className?: string;
}

export interface ILoader {
  className?: string;
  enableScroll?: boolean;
  linearItemClassName?: string;
  variant?: 'circular' | 'linear';
}

export interface NotificationOptions {
  message: string | string[];
  options: {
    autoClose?: boolean | undefined;
    autoCloseTime?: number | undefined;
  } | undefined;
}

export type RadioGroupItemProps = {
  className?: string;
  disabled?: boolean;
  id: string;
  label?: string;
} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

export interface ISearchBar {
  borderRadius?: 'default' | 'lg';
  disabled?: boolean;
  iconClassName?: string;
  label?: string;
  placeholder?: string;
  size?: 'default' | 'sm' | 'lg';
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string | number ;
  variant?: 'filled' | 'outlined' | 'underlined';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISkeleton {
  className?: string;
  animation?: boolean;
}

export type SwitchProps = {
  className?: string;
  variant?: 'apple' | 'android';
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

export interface ITabs {
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
  contentPlacement?: 'top' | 'bottom' | 'left' | 'right';
  contentClasName?: string;
}

export interface ITab {
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

export interface ITextField {
  alwaysTop?: boolean;
  borderRadius?: 'default' | 'lg';
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: boolean;
  id?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showRequiredIcon?: boolean;
  size?: 'default' | 'sm' | 'lg';
  startIcon?: React.ReactNode;
  tooltip?: string | string[];
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string | number;
  variant?: 'filled' | 'outlined' | 'underlined';
}

export interface IFormikErrorText {
  id: string;
  formik: object;
}

export interface IFormikInput {
  id: string;
  formik: any;
  label: string;
  disabled?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder: string;
  tooltip?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'filled' | 'outlined' | 'underlined';
}

export interface ILoadingLinear extends React.HTMLAttributes<HTMLDivElement> {
  linearContainerClassName?: string;
  linearItemClassName?: string;
}

export interface ILoadingSpinner extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface INotificationContext {
  invoke: (type: string, message: string, autoClose?: boolean, autoCloseTime?: number, icon?: ReactNode) => void;
  translateFunction: (e: string | string[]) => void;
}
