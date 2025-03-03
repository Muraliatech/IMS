import React, { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className={`${isOpen ? 'w-60' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {isOpen && <h1 className="text-xl font-bold">Store Manager</h1>}
        <button 
          onClick={toggleSidebar} 
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg 
            className={`w-5 h-5 transform ${isOpen ? 'rotate-0' : 'rotate-180'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      </div>
      
      <nav className="flex-1 p-2">
        <ul>
          <li>
            <a href="#" className={`flex ${isOpen ? 'justify-start' : 'justify-center'} items-center p-3 rounded-md bg-blue-50 text-blue-600 mb-1`}>
              <svg className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mr-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              {isOpen && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex ${isOpen ? 'justify-start' : 'justify-center'} items-center p-3 rounded-md text-gray-700 hover:bg-gray-50 mb-1`}>
              <svg className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mr-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
              </svg>
              {isOpen && <span>Inventory</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex ${isOpen ? 'justify-start' : 'justify-center'} items-center p-3 rounded-md text-gray-700 hover:bg-gray-50 mb-1`}>
              <svg className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mr-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              {isOpen && <span>Orders</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex ${isOpen ? 'justify-start' : 'justify-center'} items-center p-3 rounded-md text-gray-700 hover:bg-gray-50 mb-1`}>
              <svg className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mr-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              {isOpen && <span>Suppliers</span>}
            </a>
          </li>
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-gray-200 ${isOpen ? 'block' : 'flex justify-center'}`}>
        <button className="flex items-center text-red-500 hover:text-red-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;