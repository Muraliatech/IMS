//   import  { useState, useRef, useEffect } from "react";
//   import { Card } from "../Card";
//   //import { Link } from "react-router-dom";
//   import { motion } from "framer-motion";
//   export const LandingPage = () => {
//     const [hoveredItem, setHoveredItem] = useState<string | null>(null);

//     const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

//     useEffect(() => {
//       navItems.forEach((item) => {
//         dropdownRefs.current[item.id] = null;
//       });
//     }, []);

//     const navItems = [
//       {
//         id: "products",
//         label: "Products",
//         cardContent: (
//           <div>
//             <h3 className="font-semibold text-lg mb-4 hidden">Products</h3>

//             <Card
//               name={["Global Payments", "Business Tools"]}
//               ele={[
//                 ["Payments", "Payment Links", "Checkout", "Elements"],
//                 ["Invoicing", "Tax Automation", "Revenue Recognition"],
//               ]}
//             />
//           </div>
//         ),
//       },
//       {
//         id: "solutions",
//         label: "Solutions",
//         cardContent: (
//           <div>
//             <h3 className="font-semibold text-lg mb-4 hidden">Solutions</h3>
//             <Card
//               name={["In-Person Payments", "Fraud Prevention"]}
//               ele={[
//                 ["Terminal", "Radar"],
//                 ["Authorization", "Acceptance Optimisations"],
//               ]}
//             />
//           </div>
//         ),
//       },
//       {
//         id: "developers",
//         label: "Developers",
//         cardContent: (
//           <div>
//             <h3 className="font-semibold text-lg mb-4 hidden">Developers</h3>
//             <Card name={["Documentation"]} ele={[["Docs"]]} />
//           </div>
//         ),
//       },
//       {
//         id: "resources",
//         label: "Resources",
//         cardContent: (
//           <div>
//             <h3 className="font-semibold text-lg mb-4 hidden">Resources</h3>
//             <Card
//               name={["Blog", "Community Videos", "Help center"]}
//               ele={[
//                 ["Inventory Solutions", "Adavanced Sales Analytics"],
//                 ["Checkout the clips"],
//                 ["Sopport"],
//               ]}
//             />
//           </div>
//         ),
//       },
//     ];

//     const handleMouseEnter = (id: string) => {
//       setHoveredItem(id);
//     };

//     const handleMouseLeave = () => {
//       setHoveredItem(null);
//     };


//     const handleSign =()=>{
//       window.location.href = "/signin"
//     }
//     return (
//       <div className="bg-[#1A365D] min-h-screen text-white">
//         <nav className="flex items-center justify-between px-50 py-4">
//           <ul className="flex space-x-6 font-semibold">
//             <div className="text-2xl font-bold cursor-pointer">primemart</div>
//             <div className="flex items-center space-x-6">
//               {navItems.map((item) => (
//                 <li key={item.id} className="relative">
//                   <div
//                     ref={(el) => (dropdownRefs.current[item.id] = el)}
//                     onMouseEnter={() => handleMouseEnter(item.id)}
//                     onMouseLeave={handleMouseLeave}
//                     className="dropdown-container"
//                   >
//                     <div className="flex items-center cursor-pointer">
//                       <a href="#" className="hover:opacity-80">
//                         {item.label}
//                       </a>

//                       <div className="flex flex-col justify-center ml-1">
//                         {hoveredItem === item.id ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="size-4"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="m4.5 15.75 7.5-7.5 7.5 7.5"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="size-4"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                             />
//                           </svg>
//                         )}
//                       </div>
//                     </div>

//                     {hoveredItem === item.id && (
//                       <div className="absolute top-10 left-0 z-10">
//                         {item.cardContent}
//                       </div>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </div>

//             <div className="flex flex-col justify-center cursor-pointer hover:opacity-80">
//               <div>Pricing</div>
//             </div>
//           </ul>

//           <div className="flex items-center space-x-4">
//           <a onClick={handleSign} className="hover:opacity-80 cursor-pointer">
//               Sign in →
//             </a>
//             <button onClick={()=>{
//               window.location.href = "/signup"
//             }} className="px-5 py-2 bg-[#3B82F6] text-white font-semibold rounded-full shadow-md hover:opacity-80 cursor-pointer">
//               Contact sales →
//             </button>
//           </div>
//         </nav>

//         <section className="flex justify-between items-center px-50 py-15">
//           <div className="max-w-xl">
//             <span className="px-3 py-1 bg-[#F8FAFC] text-[#1A365D] rounded-full text-sm">
//               Preview
//             </span>
//           <div className="cursor-pointer">

//           {/* <motion.li
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{ opacity: 1, scale: 1 }}
//   /> */}

// <motion.div
//   initial={{ opacity: 0, y: 50 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 1.5, delay: 0.5 }}
// >
//   <h1 className="text-6xl font-bold leading-tight mt-2">
//     Your Global Commerce <br />
//     <span className="text-[#F8FAFC]">Partner, Engineered</span> <br />
//     for Peak <br />
//     <span className="text-[#3B82F6]">Performance</span>
//   </h1>
// </motion.div>

// <motion.p
//   initial={{ opacity: 0, y: 30 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 1.5, delay: 0.8 }}
//   className="mt-4 text-lg text-[#F8FAFC]"
// >
//   Join millions of companies using Primemart to accept 
//   payments online and in person, and streamline inventory 
//   management with our advanced solution.
// </motion.p>
// </div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1.3, delay: 0.5 }}
//                   className="mt-4 text-lg text-[#F8FAFC]"
//                 >
//                 <button className=" px-6 py-3 bg-[#3B82F6] text-white font-semibold rounded-full shadow-md hover:bg-[#2563EB] cursor-pointer">
//               Request an invite →
//                 </button>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 200 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.5, delay: 0.8 }}
//             className="mt-4 text-lg text-[#F8FAFC]">
//           <div className="bg-[#F8FAFC] text-[#1A365D] p-6 rounded-2xl shadow-2xl w-75  ">
//             <img
//               src="/payments2.png"
//               width="100"
              
//               alt="Product"
//               className="mx-auto mb-4 rounded-xl"
//             />
//             <h2 className="text-lg font-semibold text-center">
//               Abstraction Magazine
//             </h2>
//             <p className="text-center text-gray-500">₹19 per month</p>

//             <button className="mt-4 w-full py-2 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB]">
//               Pay
//             </button>
//             <p className="text-center text-gray-500 mt-2">Or pay with card</p>

//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border border-gray-300 rounded-lg mt-3"
//             />
//             <input
//               type="text"
//               placeholder="Card Information"
//               className="w-full p-2 border border-gray-300 rounded-lg mt-3"
//             />

//             <select className="w-full p-2 border border-gray-300 rounded-lg mt-3">
//               <option>United States</option>
//               <option>India</option>
//             </select>

//             <button className="mt-4 w-full py-2 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB]">
//               Subscribe
//           </button>
//         </div>
//           </motion.div>
//       </section>
//     </div>
//   );
// };



import { useState, useRef, useEffect } from "react";
import { Card } from "../Card";
import { motion } from "framer-motion";

export const LandingPage = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    navItems.forEach((item) => {
      dropdownRefs.current[item.id] = null;
    });
  }, []);

  const navItems = [
    {
      id: "products",
      label: "Products",
      cardContent: (
        <div>
          <h3 className="font-semibold text-lg mb-4 hidden">Products</h3>
          <Card
            name={["Global Payments", "Business Tools"]}
            ele={[
              ["Payments", "Payment Links", "Checkout", "Elements"],
              ["Invoicing", "Tax Automation", "Revenue Recognition"],
            ]}
          />
        </div>
      ),
    },
    {
      id: "solutions",
      label: "Solutions",
      cardContent: (
        <div>
          <h3 className="font-semibold text-lg mb-4 hidden">Solutions</h3>
          <Card
            name={["In-Person Payments", "Fraud Prevention"]}
            ele={[
              ["Terminal", "Radar"],
              ["Authorization", "Acceptance Optimisations"],
            ]}
          />
        </div>
      ),
    },
    {
      id: "developers",
      label: "Developers",
      cardContent: (
        <div>
          <h3 className="font-semibold text-lg mb-4 hidden">Developers</h3>
          <Card name={["Documentation"]} ele={[["Docs"]]} />
        </div>
      ),
    },
    {
      id: "resources",
      label: "Resources",
      cardContent: (
        <div>
          <h3 className="font-semibold text-lg mb-4 hidden">Resources</h3>
          <Card
            name={["Blog", "Community Videos", "Help center"]}
            ele={[
              ["Inventory Solutions", "Adavanced Sales Analytics"],
              ["Checkout the clips"],
              ["Sopport"],
            ]}
          />
        </div>
      ),
    },
  ];

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleSign = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="bg-[#1A365D] min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-50 py-4">
        <div className="text-2xl font-bold cursor-pointer mb-4 md:mb-0">primemart</div>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 font-semibold">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <div
                ref={(el) => (dropdownRefs.current[item.id] = el)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className="dropdown-container"
              >
                <div className="flex items-center cursor-pointer">
                  <a href="#" className="hover:opacity-80">
                    {item.label}
                  </a>
                  <div className="flex flex-col justify-center ml-1">
                    {hoveredItem === item.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {hoveredItem === item.id && (
                  <div className="absolute top-10 left-0 z-10">
                    {item.cardContent}
                  </div>
                )}
              </div>
            </li>
          ))}
          <div className="flex flex-col justify-center cursor-pointer hover:opacity-80">
            <div>Pricing</div>
          </div>
        </ul>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a onClick={handleSign} className="hover:opacity-80 cursor-pointer">
            Sign in →
          </a>
          <button
            onClick={() => {
              window.location.href = "/signup";
            }}
            className="px-5 py-2 bg-[#3B82F6] text-white font-semibold rounded-full shadow-md hover:opacity-80 cursor-pointer"
          >
            Contact sales →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-50 py-15">
        <div className="max-w-xl text-center md:text-left">
          <span className="px-3 py-1 bg-[#F8FAFC] text-[#1A365D] rounded-full text-sm">
            Preview
          </span>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-2">
              Your Global Commerce <br />
              <span className="text-[#F8FAFC]">Partner, Engineered</span> <br />
              for Peak <br />
              <span className="text-[#3B82F6]">Performance</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-4 text-lg text-[#F8FAFC]"
          >
            Join millions of companies using Primemart to accept payments online
            and in person, and streamline inventory management with our advanced
            solution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5 }}
            className="mt-4 text-lg text-[#F8FAFC]"
          >
            <button className="px-6 py-3 bg-[#3B82F6] text-white font-semibold rounded-full shadow-md hover:bg-[#2563EB] cursor-pointer">
              Request an invite →
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 md:mt-0"
        >
          <div className="bg-[#F8FAFC] text-[#1A365D] p-6 rounded-2xl shadow-2xl w-full md:w-75">
            <img
              src="/payments2.png"
              width="100"
              alt="Product"
              className="mx-auto mb-4 rounded-xl"
            />
            <h2 className="text-lg font-semibold text-center">
              Abstraction Magazine
            </h2>
            <p className="text-center text-gray-500">₹19 per month</p>
            <button className="mt-4 w-full py-2 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB]">
              Pay
            </button>
            <p className="text-center text-gray-500 mt-2">Or pay with card</p>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg mt-3"
            />
            <input
              type="text"
              placeholder="Card Information"
              className="w-full p-2 border border-gray-300 rounded-lg mt-3"
            />
            <select className="w-full p-2 border border-gray-300 rounded-lg mt-3">
              <option>United States</option>
              <option>India</option>
            </select>
            <button className="mt-4 w-full py-2 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB]">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      <div className="flex bg-white text-black">
        <div className="p-5 shadow-lg">
             Customer 
        </div>
        <div>
            Cashier
        </div>
      </div>
    </div>
  );
};