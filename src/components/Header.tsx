import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeaderProps {
  siteConfig: SiteConfig;
  isAdmin?: boolean;
  onSectionClick: (sectionId: string) => void;
  onAdminClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  siteConfig, 
  isAdmin = false, 
  onSectionClick,
  onAdminClick 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="#" className={`transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {siteConfig.name}
            </a>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {siteConfig.sections
                .filter(section => section.visible)
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => onSectionClick(section.id)}
                      className={`transition-colors duration-300 hover:text-blue-500 ${
                        scrolled ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              {!isAdmin && onAdminClick && (
                <li>
                  <button 
                    onClick={onAdminClick}
                    className={`transition-colors duration-300 hover:text-blue-500 ${
                      scrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    Admin
                  </button>
                </li>
              )}
            </ul>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="space-y-3">
              {siteConfig.sections
                .filter(section => section.visible)
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <li key={section.id} className="border-b border-gray-200 pb-2">
                    <button 
                      onClick={() => {
                        onSectionClick(section.id);
                        setMobileMenuOpen(false);
                      }}
                      className="text-gray-700 block"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              {!isAdmin && onAdminClick && (
                <li className="border-b border-gray-200 pb-2">
                  <button 
                    onClick={() => {
                      onAdminClick();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-700 block"
                  >
                    Admin
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;