import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBideo } from './hooks';

import img1 from '../../assets/images/1@2x.png';
import img2 from '../../assets/images/2@2x.png';
import img3 from '../../assets/images/3@2x.png';
import styles from './index.module.scss';

const Home = () => {
  const history = useHistory();
  const { visible: coverVisible } = useBideo();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        history.push('/dashboard');
      }
    };

    document.body.addEventListener('keyup', handler, false);

    return () => {
      document.body.removeEventListener('keyup', handler, false);
    };
  }, [history]);

  return (
    <div className={styles.container}>
      <video id="bg_video" className={styles.video} loop muted />
      {coverVisible && <div className={styles.cover} />}

      <div className={styles.content}>让您的每一分钱都有价值</div>

      <div className={styles.master}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <img className={styles.img1} src={img1} alt="" />
            <div className={styles.title}>提升广告效果</div>
            <div className={styles.desc}>支持查看效果数据前后对比， 让效果更明显</div>
          </div>

          <div className={styles.block}>
            <img className={styles.img2} src={img2} alt="" />
            <div className={styles.title}>降低广告成本</div>
            <div className={styles.desc}>支持查看不同出价成本变化， 让您少花钱</div>
          </div>

          <div className={styles.block}>
            <img className={styles.img3} src={img3} alt="" />
            <div className={styles.title}>加快优化速度</div>
            <div className={styles.desc}>提供智能推荐最佳出价， 让您快速调整</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
