"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MenuLinks } from "@/lib/Links";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Main Navigation */}
      <nav className="flex justify-between py-3 border-b mb-5 items-center">
        <div className="flex gap-3 items-center">
          <div className="sm:hidden cursor-pointer">
            <div onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </div>
          <div className="hidden sm:block">
            <Link href={"/"} className="font-bold">
              LOGO
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="sm:hidden">
            <Link href={"/"} className="font-bold">
              LOGO
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-4 justify-end items-center">
              {MenuLinks.map((item) => (
                <Link key={item.key} href={item.link}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <ModeToggle />
          <Button variant={"outline"}>Signin</Button>
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 ease-in-out duration-300`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <div className="font-bold">Menu</div>
            <button className="text-gray-600" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-2 ">
            {MenuLinks.map((item) => (
              <div key={item.key} className="mb-2">
                <Link href={item.link} onClick={() => setIsOpen(!isOpen)}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-30 "
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
