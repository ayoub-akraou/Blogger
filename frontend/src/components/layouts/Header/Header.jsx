import React, { useState } from "react";
import Logo from "../../UI/Logo/Logo.jsx";
import SearchBar from "../../UI/SearchBar.jsx";
import LogoIcon from "../../Icons/Logo.jsx";
import BurgerMenu from "../../Icons/BurgerMenu.jsx";
import Menu from "./Menu.jsx";

export default function Header({ className }) {
  const [isOpened, setIsOpened] = useState(false);

  function toggleMenu() {
    setIsOpened(prev => !prev);
  }
  return (
    <header className={`${className} bg-secondary  px-10 py-5 text-white`}>
      <nav className="mx-auto container flex items-center justify-between gap-5">
        <Logo isLight={true} className="mr-auto hidden sm:block" />
        <LogoIcon className="sm:hidden"></LogoIcon>
        <SearchBar className="hidden sm:flex" />
        <Menu isOpened={isOpened} onClick={toggleMenu} />
        <BurgerMenu className="sm:hidden" onClick={toggleMenu} />
      </nav>
    </header>
  );
}
