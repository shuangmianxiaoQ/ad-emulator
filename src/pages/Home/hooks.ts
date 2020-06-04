import { useState, useEffect } from 'react';
import videoSrc from '../../assets/video/video_bg.mp4';

export const useBideo = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const bv = new window.Bideo();

    bv.init({
      // Video element
      videoEl: document.querySelector('#bg_video'),
      // Container element
      container: document.querySelector('body'),
      // Resize
      resize: true,
      // autoplay: false,

      // Array of objects containing the src and type of different video formats to add
      src: [{ src: videoSrc, type: 'video/mp4' }],

      // What to do once video loads (initial frame)
      onLoad() {
        setVisible(false);
      }
    });
  }, []);

  return { visible };
};
