import { ListData, Dimension, Category } from 'src/models';

type Order = 'asc' | 'desc';

const orderBy = (arr: any[], props: string[], orders: Order[]) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

const formatterDate = (date: string) => {
  const [, month, day] = date.split('-');
  return `${month}/${day}`;
};

const processChartData = (data: ListData, type: Dimension) => {
  const { before, after } = data;
  let result = [];

  if (type === 'ctr') {
    result = before.map(({ statDate, click, show }) => {
      const afterItem = after.find(item => item.statDate === statDate)!;
      return {
        statDate: formatterDate(statDate),
        before: (click / show).toFixed(4),
        after: (afterItem.click / afterItem.show).toFixed(4)
      };
    });
  } else {
    result = before.map(item => {
      const afterItem = after.find(({ statDate }) => statDate === item.statDate)!;
      return {
        statDate: formatterDate(item.statDate),
        before: item[type],
        after: afterItem[type]
      };
    });
  }

  return result;
};

const toPercentage = (num: number) => {
  return (num * 100).toFixed(4) + '%';
};

const processPieData = (data: Category[]) => {
  const sortData: Category[] = orderBy(data, ['num'], ['desc']);
  // 除Top4以外的`Num`总和
  const restNum = data.reduce((acc, item, index) => {
    const num = index > 4 ? item.num : 0;
    return (acc += num);
  }, 0);

  return sortData.length > 5 ? [...sortData.slice(0, 4), { category: '其他', num: restNum }] : sortData;
};

export { processChartData, toPercentage, processPieData };
