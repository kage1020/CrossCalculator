import { Select, SelectItem } from '@nextui-org/react';
import { NextUISelectProps } from './types';
import '../../dist/index.css';

export default function NextUISelect({ options = [], ...props }: NextUISelectProps) {
  return (
    <Select {...props}>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export { Select, SelectItem };
