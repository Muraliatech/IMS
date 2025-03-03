import React from 'react';
import MetricCard from './MetricCard';
import SalesChart from './SalesChart';
import InventoryDistribution from './InventoryDistribution';
import TopSellingProducts from './TopSellingProducts';
import Sidebar from './Sidebar';

function Dashboard() {
  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <div className="p-6 space-y-6">
       
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon="💰"
        />
        <MetricCard 
          title="Sales"
          value="+2,350"
          change="+12.2% from last month"
          icon="📈"
        />
        <MetricCard 
          title="Active Customers"
          value="+573"
          change="+8.4% from last month"
          icon="👥"
        />
        <MetricCard 
          title="Low Stock Items"
          value="12"
          change="Need attention"
          icon="⚠️"
          isNegative
        />
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <InventoryDistribution />
        </div>
      </div>
 
      <TopSellingProducts />
    </div>
    </div>
  );
}

export default Dashboard;