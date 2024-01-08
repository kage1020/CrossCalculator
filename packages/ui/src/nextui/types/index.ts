import { ButtonProps, CardProps, ChipProps, SelectProps } from '@nextui-org/react';

export type NextUIButtonProps = ButtonProps;
export type NextUICardProps = CardProps;
export type NextUIChipProps = ChipProps;
export type NextUISelectProps = Omit<SelectProps, 'children'> & {
  options: {
    label: string;
    value: string;
  }[];
};
