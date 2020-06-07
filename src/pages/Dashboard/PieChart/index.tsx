import React, { FC } from 'react';
import { PieChart, Pie, Tooltip, Cell, PieLabelRenderProps, Legend } from 'recharts';

const COLORS = ['#FF4750', '#FFCF37', '#824FFF', '#37FFC2', '#38C6F2'];
const RADIAN = Math.PI / 180;

type Props = {
  data: any[];
};

const Chart: FC<Props> = ({ data }) => {
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

  return (
    <PieChart width={541} height={317} margin={{ left: 70 }}>
      <Pie
        data={data}
        cx={240}
        cy={160}
        outerRadius={96}
        innerRadius={52}
        labelLine={false}
        label={renderCustomizedLabel}
        nameKey="category"
        dataKey="num"
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" align="left" verticalAlign="middle" iconType="circle" iconSize={6} />
    </PieChart>
  );
};

export default Chart;
