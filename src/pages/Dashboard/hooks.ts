import { useEffect, useState } from 'react';
import { message } from 'antd';
import API from 'src/services';
import { ListData, PieData } from 'src/models';

export const useListData = () => {
  const [loading, setLoading] = useState(false);
  const [listData, setList] = useState<ListData>({ before: [], after: [] });

  const fetchingList = (price: number) => {
    setLoading(true);
    API.getListData({ price }).then(res => {
      if (res) {
        setTimeout(() => {
          setLoading(false);
          setList(res);
        }, 500);
      } else {
        message.error('请求数据错误');
      }
    });
  };

  useEffect(() => {
    fetchingList(1);
  }, []);

  return { loading, listData, fetchingList };
};

export const usePieData = () => {
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState<PieData>({ before: [], after: [] });

  const fetchingPieData = (price: number) => {
    setLoading(true);
    API.getPieData({ price }).then(res => {
      if (res) {
        setTimeout(() => {
          setLoading(false);
          setPieData(res);
        }, 500);
      } else {
        message.error('请求数据错误');
      }
    });
  };

  useEffect(() => {
    fetchingPieData(1);
  }, []);

  return { loading, pieData, fetchingPieData };
};
