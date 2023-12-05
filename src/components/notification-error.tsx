"use client";

import { NotificationPortal } from "./notification-portal";
import { NotificationProps } from "./notification-success";

export const NotificationError = ({
  text,
  portal = true,
}: NotificationProps) => {
  const Notification = () => (
    <div className="wrapper-notification">
      <div className="notification bg-red-500 hover:bg-red-600">{text}</div>
    </div>
  );
  if (!portal) return <Notification />;
  return (
    <NotificationPortal>
      <Notification />
    </NotificationPortal>
  );
};
