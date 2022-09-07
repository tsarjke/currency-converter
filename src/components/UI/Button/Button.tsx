import React from 'react';
import swapBtn from '../../../assets/icons/swap.svg';

import cl from './Button.module.css';

interface IButtonProps {
  onClick: () => void;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({ onClick, className }) => (
  <button className={className ? [cl.btn, className].join(' ') : cl.btn} type="button" onClick={onClick}>
    <img src={swapBtn} alt="Swap currencies button" />
  </button>
);

Button.defaultProps = {
  className: '',
};

export default Button;
