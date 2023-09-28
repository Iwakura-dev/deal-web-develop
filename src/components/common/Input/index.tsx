import React, {forwardRef} from 'react';
import styles from './styles.module.scss';

type InputProps = {
  error?: string;
  label?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({error, label, ...rest}, ref) => (
    <div
      className={
        !!error ? `${styles.container} ${styles.error}` : styles.container
      }>
      <label>{label}</label>
      <input ref={ref} {...rest} />
      <span className={styles.helperText}>{error}</span>
    </div>
  ),
);

export default Input;
