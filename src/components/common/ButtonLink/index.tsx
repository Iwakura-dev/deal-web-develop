import React, {PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import Link, {LinkProps} from 'next/link';

const ButtonLink = ({children, href}: LinkProps & PropsWithChildren) => (
  <Link className={styles.buttonLink} href={href}>
    {children}
  </Link>
);

export default ButtonLink;
