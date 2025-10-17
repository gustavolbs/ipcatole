"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoWithName from "./LogoWithName";

interface NavbarProps {
  user?: string | null;
}

const navItems = [
  { name: "Início", path: "/" },
  { name: "Bíblia", path: "/biblia" },
  { name: "Hinário", path: "/hinario" },
  { name: "Catecismo", path: "/catecismo" },
  { name: "Artigos", path: "/artigos" },
];

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
          >
            <LogoWithName />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}

            {/* Botão dinâmico */}
            {user ? (
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  className="font-medium"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}

            {/* Botão dinâmico mobile */}
            {user ? (
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
