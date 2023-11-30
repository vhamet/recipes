import { useState } from "react";

import "./AnimatedBurgerMenu.css";

type AnimatedBurgerMenuProps = {
  onClick?: (status: boolean) => void;
};
const AnimatedBurgerMenu = ({ onClick }: AnimatedBurgerMenuProps) => {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    setStatus(!status);
    onClick?.(!status);
  };

  return (
    <div
      className={`animated-burger-menu${status ? " clicked" : ""}`}
      onClick={handleClick}
    >
      <div className="line line-1"></div>
      <div className="line line-2"></div>
      <div className="line line-3"></div>
    </div>
  );
};

export default AnimatedBurgerMenu;
