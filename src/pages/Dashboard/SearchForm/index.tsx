import React, { useState, FC } from 'react';
import { Select, Input } from 'antd';

import styles from './index.module.scss';

const { Option } = Select;

type Props = {
  onSubmit: (value: number) => void;
};

const SearchForm: FC<Props> = ({ onSubmit }) => {
  const [price, setPrice] = useState('1.2');
  const [bidType, setBidType] = useState(1);

  const handleChangeBidType = (value: number) => {
    setBidType(value);

    switch (value) {
      case 1:
        setPrice('1.2');
        break;
      case 2:
        setPrice('10');
        break;
      case 3:
        setPrice('-10');
        break;
    }
  };

  const handleSubmit = () => {
    price && price === '1.2' ? onSubmit(1) : onSubmit(Number(price));
  };

  return (
    <div id="search_form" className={styles.form}>
      <div className={styles.plan}>
        <div className={styles.label}>
          <div className={styles.line} />
          <label>广告计划</label>
        </div>

        <Select className={styles.select} suffixIcon={null} defaultValue={1}>
          <Option value={1}>都业华丨剖析股市热点投资机会</Option>
        </Select>

        <div className={styles.item}>
          投放时间：<span>2020.5.29—2020.7.1</span>
        </div>
        <div className={styles.item}>
          昨日出价：<span>1.1元/点击</span>
        </div>
        <div className={`${styles.item} ${styles.score}`}>
          质量得分：<span>70</span>
        </div>
      </div>

      <div className={styles.bid}>
        <label className={styles.label}>调整出价</label>

        <div className={styles.fields}>
          <Select
            className={`${styles.select} bid-select`}
            value={bidType}
            onChange={handleChangeBidType}
            suffixIcon={null}
          >
            <Option value={1}>固定出价</Option>
            <Option value={2}>按比例提高</Option>
            <Option value={3}>按比例降低</Option>
          </Select>
          <Input
            className={styles.input}
            placeholder="请输入"
            value={price}
            onChange={e => setPrice(e.target.value)}
            addonAfter={bidType === 1 ? '元/次点击' : '%'}
          />
        </div>

        <button className={styles.btn} onClick={handleSubmit}>
          <span>开始模拟</span>
          <span className={styles.iconArrow} />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
