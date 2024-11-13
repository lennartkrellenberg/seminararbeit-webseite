"use client";

import { NavbarData } from "@/app/types";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header({ navbarData }: { navbarData: NavbarData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!navbarData) {
    return null; 
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {navbarData.logo?.[0]?.formats?.thumbnail && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${navbarData.logo[0].formats.thumbnail.url}`}
                alt={navbarData.logo[0].formats.thumbnail.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="font-bold text-xl">{navbarData.brand}</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {navbarData.items.map((link) => (
              <Link key={link.id} href={link.link} className="hover:underline">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-2">
              {navbarData.items.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  className="hover:bg-primary/10 px-2 py-1 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
