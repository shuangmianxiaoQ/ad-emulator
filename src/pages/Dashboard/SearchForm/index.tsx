import React from 'react';
import { Select, Input } from 'antd';

import styles from './index.module.scss';
import './index.scss';

const { Option } = Select;

const SearchForm = () => {
  return (
    <div id="search_form" className={styles.form}>
      <div className={styles.plan}>
        <div className={styles.label}>
          <div className={styles.line} />
          <label>广告计划</label>
        </div>

        <Select className={styles.select} suffixIcon={null}>
          <Option value={1}>计划名称</Option>
        </Select>

        <div className={styles.item}>
          投放时间：<span>2020.11.11—2021.11.11</span>
        </div>
        <div className={styles.item}>
          原始出价：<span>2元/点击</span>
        </div>
        <div className={`${styles.item} ${styles.score}`}>
          质量得分：<span>70</span>
        </div>
      </div>

      <div className={styles.bid}>
        <label className={styles.label}>调整出价</label>

        <div className={styles.fields}>
          <Select className={`${styles.select} bid-select`} suffixIcon={null}>
            <Option value={1}>固定出价</Option>
            <Option value={2}>按比例提高</Option>
            <Option value={3}>按比例降低</Option>
          </Select>
          <Input className={styles.input} placeholder="请输入" addonAfter="元/次点击" />
        </div>

        <button className={styles.btn}>开始模拟</button>
      </div>
    </div>
  );
};

export default SearchForm;
