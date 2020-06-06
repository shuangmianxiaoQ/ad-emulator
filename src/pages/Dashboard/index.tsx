import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import List from './List';
import API from 'src/services';

import avatar from '../../assets/images/avatar.png';
import styles from './index.module.scss';

const Dashboard = () => {
  const [listData, setList] = useState({ before: [], after: [] });
  const [pieData, setPieData] = useState({ before: [], after: [] });

  useEffect(() => {
    API.getListData({ price: 1 }).then(res => {
      setList(res);
    });

    API.getPieData({ price: 1 }).then(res => {
      setPieData(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sider}>
        <div className={styles.user}>
          <img className={styles.avatar} src={avatar} alt="" />
          <span>Jessica</span>
        </div>
        <div className={`${styles.menu} ${styles.iconHome}`} />
        <div className={`${styles.menu} ${styles.iconChart}`} />
        <div className={`${styles.menu} ${styles.iconList}`} />
        <div className={styles.avtiveMenu}>
          <div className={styles.line} />
          <div className={`${styles.menu} ${styles.iconRise}`} />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.iconMessage} />
        </div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
        <div className={styles.areaChart}>
          <AreaChart data={listData} />
        </div>
        <div className={styles.list}>
          <List data={listData} />
        </div>
        <div className={styles.pieChart}>
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
