import React, { FC } from 'react';
import { Table } from 'antd';

import './index.scss';
import styles from './index.module.scss';

const { Column } = Table;

type Props = {
  data: any;
};

const renderCtr = (text: any, record: any) => {
  const ctr = record.click / record.show;
  return ctr;
};

const List: FC<Props> = ({ data }) => {
  const { before, after } = data;

  return (
    <Table id="table_list" rowKey="statDate" className={styles.list} dataSource={before} pagination={false}>
      <Column title="时间" dataIndex="statDate" key="statDate" />
      <Column title="展示量" dataIndex="show" key="show" />
      <Column title="点击量" dataIndex="click" key="click" />
      <Column title="费用" dataIndex="consume" key="consume" />
      <Column title="点击率" dataIndex="ctr" key="ctr" render={renderCtr} />
    </Table>
  );
};

export default List;
