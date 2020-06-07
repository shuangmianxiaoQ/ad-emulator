import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import SearchForm from './SearchForm';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import List from './List';
import API from 'src/services';

import avatar from '../../assets/images/avatar.png';
import empty from '../../assets/images/empty@2x.png';
import styles from './index.module.scss';

const Dashboard = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [listData, setList] = useState({ before: [], after: [] });
  const [pieData, setPieData] = useState({ before: [], after: [] });

  const fetchingList = (price: number) => {
    setLoading1(true);
    API.getListData({ price }).then(res => {
      setLoading1(false);
      setList(res);
    });
  };

  const fetchingPieData = (price: number) => {
    setLoading2(true);
    API.getPieData({ price }).then(res => {
      setLoading2(false);
      setPieData(res);
    });
  };

  const handleSubmit = (value: string) => {
    fetchingList(Number(value));
    fetchingPieData(Number(value));
  };

  useEffect(() => {
    fetchingList(1);
    fetchingPieData(1);
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
        <div className={styles.avtiveMenu}>
          <div className={styles.line} />
          <div className={`${styles.menu} ${styles.iconRise}`} />
        </div>
        <div className={`${styles.menu} ${styles.iconList}`} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.iconMessage} />
        </div>
        <div className={styles.searchForm}>
          <SearchForm onSubmit={handleSubmit} />
        </div>

        {!loading1 && !loading2 ? (
          listData.before.length > 0 ? (
            <>
              <div className={styles.areaChart}>
                <AreaChart data={listData} />
              </div>
              <div className={styles.list}>
                <List data={listData} />
              </div>
              <div className={styles.pieChart}>
                <div className={styles.beforePie}>
                  <PieChart data={pieData.before} />
                </div>
                <div className={styles.afterPie}>
                  <PieChart data={pieData.after} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <img src={empty} alt="" />
              <div className={styles.tip}>没有找到相关数据</div>
            </div>
          )
        ) : (
          <div className={styles.loading}>
            <LoadingOutlined className={styles.icon} spin />
            <div className={styles.tip}>努力计算中…</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
