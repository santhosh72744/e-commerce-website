"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiGlobe } from "react-icons/fi";

type Item = { id: string; title: string; href?: string; children?: Item[] };

export default function Navbar() {
  const [items, setItems] = useState<Item[]>([]);
  const [openMobile, setOpenMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("en");
  const [cartCount] = useState(2);

  // Dummy data for demonstration since localhost fetch won't work here:
  useEffect(() => {
    setItems([
        { id: "1", title: "Home", href: "#" },
        { id: "2", title: "Deals", href: "#" },
        { id: "3", title: "My Orders", href: "#" },
    ]);
  }, []);

  return (
    // Base yellow background for the main section, brighter accent blue for the top bar
    <header className="w-full bg-[#ffcc4d]"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The main flex container */}
        <div className="flex items-center justify-between h-16 gap-4"> {/* Adjusted height slightly */}
          
          {/* left: hamburger + small logo area */}
          <div className="flex items-center gap-4 min-w-[120px]">
            <button 
                className="sm:hidden text-gray-800 p-2 rounded-md hover:bg-yellow-500 transition"
                onClick={() => setOpenMobile(!openMobile)}
            >
                <FiMenu className="w-6 h-6" />
            </button>
           
          </div>

          {/* center: category + search (cleaner, single input style) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <div className="flex items-center h-10 bg-white rounded-lg shadow-md overflow-hidden"> {/* Softer corners */}
                
                {/* Category / left pill - integrated into input visually */}
                <div className="flex items-center gap-2 px-3 h-full border-r border-gray-200 bg-gray-50">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    All Category <FiChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Input */}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, and more..."
                  className="flex-1 px-4 text-sm h-full outline-none placeholder-gray-500"
                />

                {/* Search button (using the accent red/orange color) */}
                <button
                  onClick={() => console.log("search:", query)}
                  className="flex items-center justify-center px-4 h-full bg-[#ff6a3d] hover:bg-[#ff5a2a] transition text-white"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* right: language, cart, account icons */}
          <div className="flex items-center gap-4 min-w-[180px] justify-end">
            
            {/* Language (integrated better) */}
           

            {/* Cart Icon */}
            <a href="/cart" className="relative p-2 rounded-full text-gray-800 hover:bg-yellow-500 transition" title="Cart">
              <FiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </a>

            {/* Account Icon */}
            <a href="/account" className="hidden sm:inline-flex items-center gap-2 text-gray-800 p-2 rounded-full hover:bg-yellow-500 transition" title="Account">
              <FiUser className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* mobile collapse menu - using the primary blue for the mobile menu background */}
      <div className={`${openMobile ? "block" : "hidden"} sm:hidden border-t border-gray-200 bg-white`}>
        <nav className="px-4 py-3 space-y-1">
          {items.map((it) =>
              <a key={it.id} href={it.href ?? "#"} className="block py-2 text-gray-800 hover:text-[#ff6a3d] transition font-medium">
                {it.title}
              </a>
          )}
        </nav>
      </div>
    </header>
  );
}
