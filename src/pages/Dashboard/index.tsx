import React from 'react';
import SearchForm from './SearchForm';
import LineChart from './LineChart';
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
        <SearchForm />
        <LineChart />
        <PieChart />
        <List />
      </div>
    </div>
  );
};

export default Dashboard;
