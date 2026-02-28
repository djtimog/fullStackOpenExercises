import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./reducer/notification";
const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
