"use client";

import { NotificationPortal } from "./notification-portal";
export interface NotificationProps {
  text: string;
  portal?: boolean;
}

export const NotificationSuccess = ({
  text,
  portal = true,
}: NotificationProps) => {
  const Notification = () => (
    <div className="wrapper-notification">
      <div className="notification bg-success-500 hover:bg-success-600">
        {text}
      </div>
    </div>
  );
  if (!portal) return <Notification />;
  return (
    <NotificationPortal>
      <Notification />
    </NotificationPortal>
  );
};
