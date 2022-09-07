import React from 'react';
import { ICurrencies } from '../../../types/types';
import cl from './Select.module.css';

interface SelectProps {
  options: ICurrencies[] | null;
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options, defaultValue, value, onChange, className,
}) => (
  <div className={className ? [cl.container, className].join(' ') : cl.container}>
    <select
      className={cl.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {defaultValue}
      </option>
      {options
        && options.map(({ symbol, name }) => (
          <option key={`${name}.${symbol}`} value={symbol}>
            {`${symbol} - ${name}`}
          </option>
        ))}
    </select>
  </div>
);

Select.defaultProps = {
  className: '',
};

export default Select;
