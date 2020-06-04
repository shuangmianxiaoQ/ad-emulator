import React from 'react';
import SearchForm from './SearchForm';
import LineChart from './LineChart';
import PieChart from './PieChart';

const Dashboard = () => {
  return (
    <div>
      <SearchForm />
      
      <LineChart />

      <PieChart />
    </div>
  );
};

export default Dashboard;
