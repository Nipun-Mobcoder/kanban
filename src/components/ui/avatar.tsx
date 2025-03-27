"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styles from "./ui.module.css";

function Avatar({
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={styles.avatar}
      {...props}
    />
  );
}

function AvatarImage({
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={styles.avatar_image}
      {...props}
    />
  );
}

function AvatarFallback({
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={styles.avatar_fallback}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
