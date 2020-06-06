import React, { FC } from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend } from 'recharts';

import styles from './index.module.scss';

type Props = {
  data: any;
};

const handleData = (data: any) => {
  const { before, after } = data;

  const result = before?.map((item: any) => {
    return {
      statDate: item.statDate,
      beforeShow: item.show,
      afterShow: after?.find(({ statDate }: any) => statDate === item.statDate)?.show
    };
  });

  return result;
};

const Chart: FC<Props> = ({ data }) => {
  const chartData = handleData(data);

  return (
    <div className={styles.wrapper}>
      <AreaChart width={1160} height={380} data={chartData} margin={{ right: 30 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c4bff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7c4bff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f9ca35" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f9ca35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="statDate" />
        <YAxis />
        <CartesianGrid vertical={false} horizontal={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend align="left" verticalAlign="top" iconType="circle" height={50} />
        <Area type="monotone" dataKey="beforeShow" stroke="#7c4bff" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="afterShow" stroke="#f9ca35" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </div>
  );
};

export default Chart;
