import React from 'react';
import { Table } from 'antd';

import './index.scss';
import styles from './index.module.scss';

const { Column } = Table;

const List = () => {
  return (
    <Table id="table_list" className={styles.list} dataSource={[]}>
      <Column title="时间" dataIndex="" key="" />
      <Column title="展示量" dataIndex="" key="" />
      <Column title="点击量" dataIndex="" key="" />
      <Column title="费用" dataIndex="" key="" />
      <Column title="点击率" dataIndex="" key="" />
    </Table>
  );
};

export default List;
