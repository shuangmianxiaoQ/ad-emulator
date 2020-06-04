import React from 'react';
import { useBideo } from './hooks';

import styles from './index.module.scss';

const Home = () => {
  const { visible: coverVisible } = useBideo();

  return (
    <div className={styles.container}>
      <video id="bg_video" className={styles.video} loop muted />
      {coverVisible && <div className={styles.cover} />}
      <div className={styles.overlay}></div>
    </div>
  );
};

export default Home;
