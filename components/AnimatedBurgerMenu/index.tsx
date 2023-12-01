import { useState } from "react";

import { cn } from "@/lib/utils";

import "./AnimatedBurgerMenu.css";

const BURGER_LINE_CLASSES = "bg-cream transition-all duration-500";
const BURGER_DOT_CLASSES =
  "h-[2px] w-[2px] absolute bg-background rounded-full";

type AnimatedBurgerMenuProps = {
  onClick?: (active: boolean) => void;
};

const AnimatedBurgerMenu = ({ onClick }: AnimatedBurgerMenuProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    onClick?.(!active);
  };

  return (
    <div
      className="animated-burger-menu w-8 h-8 absolute z-[2] flex flex-col items-center justify-around cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={cn(
          BURGER_LINE_CLASSES,
          "h-4 w-11/12 relative rounded-tl-[150px] rounded-tr-[150px] rounded-bl-[15px] rounded-br-[15px]",
          active && "opacity-0"
        )}
      >
        <div className={cn(BURGER_DOT_CLASSES, "bottom-1 left-1")}></div>
        <div className={cn(BURGER_DOT_CLASSES, "top-1 left-1/2")}></div>
        <div className={cn(BURGER_DOT_CLASSES, "bottom-1 right-1")}></div>
      </div>
      <div
        className={cn(
          BURGER_LINE_CLASSES,
          "top h-1 w-full rounded-lg",
          active && "active"
        )}
      ></div>
      <div
        className={cn(
          BURGER_LINE_CLASSES,
          "bottom h-1 w-11/12 rounded-bl-[15px] rounded-br-[15px]",
          active && "w-full rounded-lg active"
        )}
      ></div>
    </div>
  );
};

export default AnimatedBurgerMenu;
