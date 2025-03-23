// import  { useState } from 'react';
// import {motion} from "framer-motion"
// const Nav = () => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const menuItems = [
//     {
//       label: 'Product',
//       submenu: [
//         { label: 'Design', icon: '□' },
//         { label: 'Content', icon: '○' },
//         { label: 'Publish', icon: '△' }
//       ]
//     },
//     {
//       label: 'Resources',
//       submenu: [
//         { label: 'Documentation' },
//         { label: 'Guides' },
//         { label: 'Tutorials' }
//       ]
//     },
//     {
//       label: 'Community',
//       submenu: [
//         { label: 'Forum' },
//         { label: 'Discord' },
//         { label: 'Events' }
//       ]
//     }
//   ];

//   return (
//     <nav className="bg-navy-teal-gradient mt-18 bg-white border-b border-gray-100 ">
//       <div className="max-w-8xl">
//         <div className="flex justify-between h-16 items-center mr-10">
          
//           <div className="flex-shrink flex items-center">
//             <span className="text-2xl font-extrabold ml-33 text-blue-900 cursor-pointer">Primemart</span> 
//           </div>

           
//           <div className="flex space-x-4">
//             {menuItems.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative group"
//                 onMouseEnter={() => setActiveDropdown(item.label)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 <div className="text-blue-900 font-medium hover:text-gray-500 cursor-pointer flex items-center space-x-1">
//                   <span>{item.label}</span>
//                   <svg
//                     className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
                
//                 {activeDropdown === item.label && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl bg-white  ring-opacity-20  text-blue-900">
//                     <div className="py-1" role="menu">
//                       {item.submenu.map((subItem) => (
//                         <a
//                           key={subItem.label}
//                           href="#"
//                           className="flex items-center px-4 py-2 text-md text-blue-900 hover:bg-gray-100 hover:text-gray-900"
//                           role="menuitem"
//                         >
//                           <span className="mr-3 text-gray-400">{'icon' in subItem ? subItem.icon : ''}</span>
//                           {subItem.label}
//                         </a>
//                       ))}   
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
           
//             <div className="hover:text-gray-600 cursor-pointer font-medium">Pricing</div>
//             <motion.div whileHover={{scale:1.1}} className="hover:text-gray-700  text-blue-900 font-medium">Sign In </motion.div>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor" className="size-5">
//   <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
// </svg>

//             <motion.button whileHover={{scale:1.1}} className="hover:text-gray-700 bg-teal-600 text-white rounded-2xl px-4 py-2">Start Free</motion.button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;

import { useState } from "react";
import { motion } from "framer-motion";

const Nav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: "Product",
      submenu: [
        { label: "Design", icon: "□" },
        { label: "Content", icon: "○" },
        { label: "Publish", icon: "△" },
      ],
    },
    {
      label: "Resources",
      submenu: [
        { label: "Documentation" },
        { label: "Guides" },
        { label: "Tutorials" },
      ],
    },
    {
      label: "Community",
      submenu: [{ label: "Forum" }, { label: "Discord" }, { label: "Events" }],
    },
  ];

  return (
    <nav className="bg-navy-teal-gradient mt-18 bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-16 items-center">
          <div className="flex-shrink flex items-center">
            <span className="text-2xl font-extrabold text-blue-900 cursor-pointer">
              Primemart
            </span>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="text-blue-900 font-medium hover:text-gray-500 cursor-pointer flex items-center space-x-1">
                  <span>{item.label}</span>
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeDropdown === item.label && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl bg-white ring-opacity-20 text-blue-900">
                    <div className="py-1" role="menu">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.label}
                          href="#"
                          className="flex items-center px-4 py-2 text-md text-blue-900 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          <span className="mr-3 text-gray-400">
                            {"icon" in subItem ? subItem.icon : ""}
                          </span>
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="hover:text-gray-600 cursor-pointer font-medium">
              Pricing
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hover:text-gray-700 text-blue-900 font-medium"
            >
              Sign In
            </motion.div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.4"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="hover:text-gray-700 bg-teal-600 text-white rounded-2xl px-4 py-2"
            >
              Start Free
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;