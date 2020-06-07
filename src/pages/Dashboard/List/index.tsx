import React, { FC } from 'react';

import styles from './index.module.scss';

type Props = {
  data: any;
};

const toPercentage = (num: number) => {
  return (num * 100).toFixed(4) + '%';
};

const List: FC<Props> = ({ data }) => {
  const { before, after } = data;

  const renderAfter = (statDate: string, field: string) => {
    const afterItem = after.find((item: any) => statDate === item.statDate);
    return afterItem[field];
  };

  return (
    <div className={styles.list}>
      <div className={styles.head}>
        <div className={styles.item}>时间</div>
        <div className={styles.item}>单价</div>
        <div className={styles.item}>展示量</div>
        <div className={styles.item}>点击量</div>
        <div className={styles.item}>费用</div>
        <div className={styles.item}>点击率</div>
      </div>
      <div className={styles.body}>
        {before.map(({ statDate, price, show, click, consume }: any) => (
          <div key={statDate} className={styles.row}>
            <div className={styles.item}>
              <div className={styles.beforeDate}>{statDate}</div>
              <div className={styles.afterDate}>{renderAfter(statDate, 'statDate')}</div>
            </div>
            <div className={styles.item}>
              <div>{price}</div>
              <div>{renderAfter(statDate, 'price')}</div>
            </div>
            <div className={styles.item}>
              <div>{show?.toLocaleString()}</div>
              <div>{renderAfter(statDate, 'show')?.toLocaleString()}</div>
            </div>
            <div className={styles.item}>
              <div>{click?.toLocaleString()}</div>
              <div>{renderAfter(statDate, 'click')?.toLocaleString()}</div>
            </div>
            <div className={styles.item}>
              <div>{consume}</div>
              <div>{renderAfter(statDate, 'consume')}</div>
            </div>
            <div className={styles.item}>
              <div>{toPercentage(click / show)}</div>
              <div>{toPercentage(renderAfter(statDate, 'click') / renderAfter(statDate, 'show'))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
