import React, {ButtonHTMLAttributes} from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {ButtonTypes} from './button.types';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonColor: ButtonTypes;
};

const Button = ({children, buttonColor, ...rest}: ButtonProps) => (
  <button
    className={classNames(styles.button, {
      [styles.light]: buttonColor === ButtonTypes.light,
      [styles.lilac]: buttonColor === ButtonTypes.lilac,
      [styles.dark]: buttonColor === ButtonTypes.dark,
      [styles.gray]: buttonColor === ButtonTypes.gray,
    })}
    {...rest}>
    {children}
  </button>
);

export default Button;
