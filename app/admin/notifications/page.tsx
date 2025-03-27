import React from "react";
import NotificationSettings from "@/components/notifications/NotificationSettings";
import Header from "@/components/notifications/header";

const page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <NotificationSettings />
    </div>
  );
};

export default page;
