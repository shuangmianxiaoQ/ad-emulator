import React from 'react';
import SearchForm from './SearchForm';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import List from './List';

import styles from './index.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sider}></div>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.iconMessage} />
        </div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
        <div className={styles.areaChart}>
          <AreaChart />
        </div>
        <div className={styles.list}>
          <List />
        </div>
        <div className={styles.pieChart}>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
