import React, { FC } from 'react';
import { PieChart, Pie, Tooltip, Cell, PieLabelRenderProps, Legend, LegendProps, Label, PolarViewBox } from 'recharts';
import { processPieData } from 'src/utils';
import { Category } from 'src/models';

import styles from './index.module.scss';

const COLORS = ['#FF4750', '#FFCF37', '#824FFF', '#37FFC2', '#38C6F2'];
const RADIAN = Math.PI / 180;

type Props = {
  type: 'before' | 'after';
  data: Category[];
};

type CustomLabelProps = {
  viewBox?: PolarViewBox;
  value: string;
};

const CustomLabel: FC<CustomLabelProps> = ({ viewBox, value }) => {
  return (
    <text x={viewBox?.cx} y={viewBox?.cy} fill="#fff" textAnchor="middle">
      <tspan x={viewBox?.cx} dy="0.3em" fontSize={24} fontFamily="DINAlternate">
        {value}
      </tspan>
      <tspan x={viewBox?.cx} dy="1.6em" fontSize={12} color="rgba(255, 255, 255, 0.8)">
        Total
      </tspan>
    </text>
  );
};

const Chart: FC<Props> = ({ type, data }) => {
  const pieData = processPieData(data);
  const total = data.reduce((acc, cur) => (acc += cur.num), 0);

  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN) * 0.88;
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN) * 0.88;

    return (
      <text
        x={x}
        y={y}
        fontSize={12}
        fill="#fff"
        textAnchor={x > Number(cx) ? 'start' : 'end'}
        dominantBaseline="central"
      >
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
    <div className={styles.pieChart}>
      <PieChart width={541} height={317} margin={{ left: 70 }}>
        <Pie
          data={pieData}
          cx={160}
          cy={160}
          outerRadius={96}
          innerRadius={52}
          labelLine={false}
          label={renderCustomizedLabel}
          nameKey="category"
          dataKey="num"
        >
          {pieData.map(({ category }, index) => (
            <Cell key={category} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
          ))}
          <Label width={30} position="center" content={<CustomLabel value={total.toLocaleString()} />} />
        </Pie>
        <Tooltip
          contentStyle={{
            padding: 12,
            backgroundColor: '#4a4a4a',
            border: 0,
            borderRadius: 8,
            boxShadow: '0px 1px 34px 0px rgba(6, 1, 18, 0.23)'
          }}
        />
        <Legend width={150} layout="vertical" align="left" verticalAlign="middle" content={renderLegend} />
      </PieChart>
    </div>
  );
};

export default Chart;
