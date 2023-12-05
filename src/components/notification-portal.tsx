import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const NotificationPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [portalContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(portalContainer);
    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};
