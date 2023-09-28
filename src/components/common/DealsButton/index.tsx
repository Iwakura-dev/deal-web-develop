import React, {PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import Link, {LinkProps} from 'next/link';

const DealsButton = ({children, href}: LinkProps & PropsWithChildren) => (
  <Link className={styles.dealsButton} href={href}>
    {children}
  </Link>
);

export default DealsButton;
