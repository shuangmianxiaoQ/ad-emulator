import React, { FC } from 'react';

import styles from './index.module.scss';

type Props = {
  data: any;
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
        <div className={styles.item}>展示量</div>
        <div className={styles.item}>点击量</div>
        <div className={styles.item}>费用</div>
        <div className={styles.item}>点击率</div>
      </div>
      <div className={styles.body}>
        {before.map(({ statDate, show, click, consume }: any) => (
          <div key={statDate} className={styles.row}>
            <div className={styles.item}>
              <div className={styles.beforeDate}>{statDate}</div>
              <div className={styles.afterDate}>{renderAfter(statDate, 'statDate')}</div>
            </div>
            <div className={styles.item}>
              <div>{show}</div>
              <div>{renderAfter(statDate, 'show')}</div>
            </div>
            <div className={styles.item}>
              <div>{click}</div>
              <div>{renderAfter(statDate, 'click')}</div>
            </div>
            <div className={styles.item}>
              <div>{consume}</div>
              <div>{renderAfter(statDate, 'consume')}</div>
            </div>
            <div className={styles.item}>
              <div>{(click / show).toFixed(4)}</div>
              <div>{(renderAfter(statDate, 'click') / renderAfter(statDate, 'show')).toFixed(4)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
