import React, { FC } from 'react';
import { PieChart, Pie, Tooltip, Cell, PieLabelRenderProps, Legend, LegendProps } from 'recharts';
import { orderBy } from 'src/utils';

import styles from './index.module.scss';

const COLORS = ['#FF4750', '#FFCF37', '#824FFF', '#37FFC2', '#38C6F2'];
const RADIAN = Math.PI / 180;

type Props = {
  type: 'before' | 'after';
  data: any[];
};

const processData = (data: any[]) => {
  const sortData = orderBy(data, ['num'], ['desc']);
  // 除Top4以外的`Num`总和
  const restNum = data.reduce((acc, item, index) => {
    const num = index > 4 ? item.num : 0;
    return (acc += num);
  }, 0);

  return sortData.length > 5 ? [...sortData.slice(0, 4), { category: '其他', num: restNum }] : sortData;
};

const Chart: FC<Props> = ({ type, data }) => {
  const pieData = processData(data);

  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > Number(cx) ? 'start' : 'end'} dominantBaseline="central">
        {`${(Number(percent) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLegend = ({ payload }: LegendProps) => {
    return (
      <div className={styles.customLegend}>
        <div className={styles.title}>{type === 'before' ? '原始人群画像' : '调整后人群画像'}</div>
        {payload?.map(({ value, color }) => (
          <div key={value} className={styles.item}>
            <span style={{ backgroundColor: color }} />
            {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PieChart className={styles.pieChart} width={541} height={317} margin={{ left: 70 }}>
      <Pie
        data={pieData}
        cx={240}
        cy={160}
        outerRadius={96}
        innerRadius={52}
        labelLine={false}
        label={renderCustomizedLabel}
        nameKey="category"
        dataKey="num"
      >
        {pieData.map((item: any, index: number) => (
          <Cell key={item.category} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" align="left" verticalAlign="middle" content={renderLegend} />
    </PieChart>
  );
};

export default Chart;
