import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, LegendProps } from 'recharts';

import styles from './index.module.scss';
import './index.scss';

const { Option } = Select;

type Props = {
  data: any;
};

const formatterDate = (date: string) => {
  const [, month, day] = date.split('-');
  return `${month}/${day}`;
};

const processData = (data: any, type: string) => {
  const { before, after } = data;
  let result = [];

  if (type === 'ctr') {
    result = before.map((item: any) => {
      const afterItem = after.find(({ statDate }: any) => statDate === item.statDate);
      return {
        statDate: formatterDate(item.statDate),
        before: (item.click / item.show).toFixed(4),
        after: (afterItem.click / afterItem.show).toFixed(4)
      };
    });
  } else {
    result = before.map((item: any) => {
      const afterItem = after.find(({ statDate }: any) => statDate === item.statDate);
      return {
        statDate: formatterDate(item.statDate),
        before: item[type],
        after: afterItem[type]
      };
    });
  }

  return result;
};

const Chart: FC<Props> = ({ data }) => {
  const [type, setType] = useState('show');
  const chartData = processData(data, type);

  const renderLegend = ({ payload }: LegendProps) => {
    return (
      <div className={styles.customLegend}>
        {payload?.map(({ value, color }) => (
          <div key={value} className={value === 'before' ? styles.before : styles.after}>
            <span style={{ backgroundColor: color }} />
            {value === 'before' ? '原始' : '调整后'}
          </div>
        ))}
      </div>
    );
  };

  const formatterTooltip = (value: any, name: any) => {
    const formatterName = name === 'before' ? '原始' : '调整后';
    return [value, formatterName];
  };

  return (
    <div id="area_chart" className={styles.wrapper}>
      <Select className={styles.select} value={type} onChange={value => setType(value)} suffixIcon={null}>
        <Option value="show">展示量</Option>
        <Option value="click">点击量</Option>
        <Option value="consume">费用</Option>
        <Option value="ctr">点击率</Option>
      </Select>

      <AreaChart width={1252} height={461} data={chartData} margin={{ left: 70, top: 50, right: 60, bottom: 40 }}>
        <defs>
          <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c4bff" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#7c4bff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="statDate" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <CartesianGrid vertical={false} horizontal horizontalPoints={[180, 290]} stroke="#555353" />
        <Tooltip
          cursor={{ stroke: '#bdbdbd', strokeWidth: 1, strokeDasharray: '6, 6' }}
          separator=""
          formatter={formatterTooltip}
          labelFormatter={() => null}
          contentStyle={{
            padding: '15px 22px 12px 16px',
            backgroundColor: '#4a4a4a',
            border: 0,
            borderRadius: 8,
            boxShadow: '0px 1px 34px 0px rgba(6, 1, 18, 0.23)'
          }}
          itemStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        />
        <Legend align="left" verticalAlign="top" iconType="circle" height={50} content={renderLegend} />
        <Area
          type="monotone"
          dataKey="before"
          stroke="#7c4bff"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorBefore)"
        />
        <Area type="monotone" dataKey="after" stroke="#f9ca35" strokeWidth={2} fillOpacity={0} />
      </AreaChart>
    </div>
  );
};

export default Chart;
