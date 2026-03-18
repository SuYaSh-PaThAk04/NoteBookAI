import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-14 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">Knowtify</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Transform your documents into smart insights with AI-powered analysis.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["Home", "Features", "How It Works", "Pricing"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="relative hover:text-green-400 transition before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-0 before:bg-green-400 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["Docs", "Blog", "FAQs", "Support"].map((res, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="relative hover:text-green-400 transition before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-0 before:bg-green-400 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {res}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Social */}
      
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Riya Singh</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
