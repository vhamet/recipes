import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import React from "react";

type UserAvatarProps = {
  user: {
    username: string;
    image: string;
  };
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={user.image} alt={`${user.username}'s picture`} />
      <AvatarFallback>{user.username[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
