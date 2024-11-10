"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  id: number;
  name: string; // Name des Navigationspunkts
  link: string; // Ziel des Links
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface NavbarData {
  id: number; // ID der Navbar (falls relevant)
  documentId: string; // ID im CMS oder der Datenquelle
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  brand: string; // Name der Marke
  items: NavItem[]; // Array der Navigationspunkte
  logo: Image[];
}

function Header({ navbarData }: { navbarData: NavbarData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = "http:/127.0.0.1" + navbarData.logo[0].formats.thumbnail.url;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logoUrl}
              alt={navbarData.logo[0].formats.thumbnail.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl">{navbarData.brand}</span>
          </Link>

          {/* Desktop Navigation */}
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
