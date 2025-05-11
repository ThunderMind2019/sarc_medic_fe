import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";

const Header = () => {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarItem className="text-blue-600">Sarc Medic</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>Dashboard</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
