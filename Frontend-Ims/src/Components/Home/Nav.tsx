import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navigation container */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-extrabold text-blue-900 cursor-pointer">
              Primemart
            </span>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-blue-900 font-medium hover:text-gray-500 flex items-center">
                  {item.label}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.label}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {"icon" in subItem && (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            <a href="#" className="text-blue-900 font-medium hover:text-gray-500">
              Pricing
            </a>
          </div>

          {/* Auth buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-blue-900 font-medium flex items-center"
            >
              Sign In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-teal-600 text-white px-4 py-2 rounded-full font-medium"
            >
              Start Free
            </motion.button>
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-gray-500 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (shown when toggled) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <div key={item.label} className="px-3 py-2">
                <button
                  className="w-full flex justify-between items-center text-blue-900 font-medium"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.label ? null : item.label
                    )
                  }
                >
                  <span>{item.label}</span>
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeDropdown === item.label && (
                  <div className="mt-2 pl-4 space-y-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-blue-900 hover:bg-gray-50 rounded-md"
                      >
                        {"icon" in subItem && (
                          <span className="mr-2">{subItem.icon}</span>
                        )}
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-blue-900 hover:bg-gray-50 rounded-md"
            >
              Pricing
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-5 space-y-3">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-blue-900"
            >
              Sign In
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-full font-medium"
            >
              Start Free
            </motion.button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;