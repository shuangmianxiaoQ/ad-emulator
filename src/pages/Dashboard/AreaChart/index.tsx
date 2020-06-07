import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts';

import styles from './index.module.scss';

const { Option } = Select;

type Props = {
  data: any;
};

const processData = (data: any, type: string) => {
  const { before, after } = data;
  let result = [];

  if (type === 'ctr') {
    result = before.map((item: any) => {
      const afterItem = after.find(({ statDate }: any) => statDate === item.statDate);
      return {
        statDate: item.statDate,
        before: (item.click / item.show).toFixed(4),
        after: (afterItem.click / afterItem.show).toFixed(4)
      };
    });
  } else {
    result = before.map((item: any) => {
      const afterItem = after.find(({ statDate }: any) => statDate === item.statDate);
      return {
        statDate: item.statDate,
        before: item[type],
        after: afterItem[type]
      };
    });
  }

  return result;
};

const Chart: FC<Props> = ({ data }) => {
  const [type, setType] = useState('click');
  const chartData = processData(data, type);

  const handleChange = (value: string) => {
    setType(value);
  };

  return (
    <div id="area_chart" className={styles.wrapper}>
      <Select className={styles.select} value={type} onChange={handleChange} suffixIcon={null}>
        <Option value="show">展示量</Option>
        <Option value="click">点击量</Option>
        <Option value="consume">费用</Option>
        <Option value="ctr">点击率</Option>
      </Select>

      <AreaChart width={1252} height={461} data={chartData} margin={{ left: 70, top: 50, right: 60, bottom: 40 }}>
        <defs>
          <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c4bff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7c4bff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorafter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f9ca35" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f9ca35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="statDate" />
        <YAxis />
        <CartesianGrid vertical={false} horizontal={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend align="left" verticalAlign="top" iconType="circle" height={50} />
        <Area type="monotone" dataKey="before" stroke="#7c4bff" fillOpacity={1} fill="url(#colorBefore)" />
        <Area type="monotone" dataKey="after" stroke="#f9ca35" fillOpacity={1} fill="url(#colorafter)" />
      </AreaChart>
    </div>
  );
};

export default Chart;
