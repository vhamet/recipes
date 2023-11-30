import Logo from "@/components/Logo";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-between border-b border-border">
      <Logo />
      <HeaderActions />
    </header>
  );
};

export default Header;
