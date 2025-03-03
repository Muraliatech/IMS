// components/InventoryDistribution.jsx
import React, { useState, useEffect } from 'react';

function InventoryDistribution() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Mock data for the chart
  const categoryData = [
    { category: 'Electronics', percentage: 35, color: '#3b82f6' },
    { category: 'Clothing', percentage: 26, color: '#10b981' },
    { category: 'Home Goods', percentage: 17, color: '#fbbf24' },
    { category: 'Toys', percentage: 13, color: '#f97316' },
    { category: 'Books', percentage: 9, color: '#a78bfa' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderPieChart = () => {
    let cumulativePercentage = 0;
    
    return (
      <svg className="w-full h-48" viewBox="0 0 100 100">
        {categoryData.map((item, index) => {
          const startAngle = cumulativePercentage * 3.6;
          cumulativePercentage += item.percentage;
          const endAngle = cumulativePercentage * 3.6;
          
          // Convert angles to radians
          const startRad = (startAngle - 90) * Math.PI / 180;
          const endRad = (endAngle - 90) * Math.PI / 180;
          
          // Calculate coordinates
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          const largeArcFlag = item.percentage > 50 ? 1 : 0;

          return (
            <path
              key={index}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={item.color}
              className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Inventory Distribution</h2>
      <p className="text-gray-500 text-sm mb-6">By category</p>
      
      <div className="relative">
        {renderPieChart()}
        
        {/* Legend */}
        <div className="mt-4 space-y-2">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700">{item.category}</span>
              <span className="ml-auto text-gray-500">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryDistribution;