import React, {FC, ReactNode} from 'react';
import {ColumnType} from '../../../constants';
import {useI18n} from '../../../i18n';
import styles from './styles.module.scss';

interface TableProps {
  columnNames: ColumnType[];
  children: ReactNode;
}

const Table: FC<TableProps> = ({columnNames, children}) => {
  const i18n = useI18n();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnNames.map(({name, style}, index) => (
            <th key={`${name}-${index}`} style={style}>
              {i18n.t(name)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="scrollable">{children}</tbody>
    </table>
  );
};

export default Table;
