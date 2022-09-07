import React from 'react';
import cl from './TextInput.module.css';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  innerRef?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<InputProps> = ({
  value,
  onChange,
  innerRef,
  placeholder,
  className,
}) => (
  <input
    className={className ? [cl.textInput, className].join(' ') : cl.textInput}
    ref={innerRef}
    value={value}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      onChange && onChange(event.target.value)}
    placeholder={placeholder}
  />
);

TextInput.defaultProps = {
  value: undefined,
  onChange: () => null,
  innerRef: undefined,
  placeholder: '',
  className: '',
};

export default TextInput;
