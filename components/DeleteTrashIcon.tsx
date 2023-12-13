import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

type DeleteTrashIconProps = {
  handleClick: () => void;
  className?: string;
};

const DeleteTrashIcon = ({ handleClick, className }: DeleteTrashIconProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={handleClick}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      shake={hovering}
      className={cn("text-lg text-primary cursor-pointer", className)}
    />
  );
};

export default DeleteTrashIcon;
