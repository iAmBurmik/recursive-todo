import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  btnText: string;
}

const Button: FC<ButtonProps> = ({ btnText, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {btnText}
    </button>
  );
};

export default Button;
