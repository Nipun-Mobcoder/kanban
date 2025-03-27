"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default NavAvatar;
