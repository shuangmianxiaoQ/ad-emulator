import axios from 'axios';
import { message } from 'antd';

const getListData = async (params: { price: number }) => {
  try {
    const res = await axios.get('/hack-ad-word/core/logs', { params });

    if (res.status === 200) {
      return res.data;
    } else {
      message.error('请求数据错误！');
    }
  } catch (err) {
    console.error(err);
  }
};

const getPieData = async (params: { price: number }) => {
  try {
    const res = await axios.get('/hack-ad-word/core/category', { params });

    if (res.status === 200) {
      return res.data;
    } else {
      message.error('请求数据错误！');
    }
  } catch (err) {
    console.error(err);
  }
};

export default {
  getListData,
  getPieData
};
