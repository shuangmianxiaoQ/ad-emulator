import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

const List = () => {
  return (
    <Table dataSource={[]}>
      <Column title="时间" dataIndex="" key="" />
      <Column title="展示量" dataIndex="" key="" />
      <Column title="点击量" dataIndex="" key="" />
      <Column title="费用" dataIndex="" key="" />
      <Column title="点击率" dataIndex="" key="" />
    </Table>
  );
};

export default List;
