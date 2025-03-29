import React from "react";
import Header from "@/components/notifications/header";
import NotificationForm from "@/components/notifications/NotificationForm";

const page = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <NotificationForm />
    </div>
  );
};

export default page;
