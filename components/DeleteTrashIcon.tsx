import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

type DeleteTrashIconProps = {
  handleClick: () => void;
  className?: string;
  disabled?: boolean;
};

const DeleteTrashIcon = ({
  handleClick,
  className,
  disabled,
}: DeleteTrashIconProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={disabled ? undefined : handleClick}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      shake={!disabled && hovering}
      className={cn(
        "text-lg text-primary cursor-pointer",
        disabled && "opacity-70 cursor-not-allowed",
        className
      )}
    />
  );
};

export default DeleteTrashIcon;
