import { useState, useEffect } from 'react';

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
      src: [
        {
          src: 'https://fdfs.xmcdn.com/group84/M03/12/D8/wKg5JF7bfAKh0xyZAOTLKeRfpCM015.mp4',
          type: 'video/mp4'
        }
      ],

      // What to do once video loads (initial frame)
      onLoad() {
        setVisible(false);
      }
    });
  }, []);

  return { visible };
};
