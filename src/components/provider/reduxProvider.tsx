"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/src/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "@/src/components/core/toast";
import LoadingOverlay from "@/src//components/core/loadingOverlay";
import ConfirmationDialog from "@/src//components/core/confirmationDialog";

const ReduxProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toast />
        <LoadingOverlay />
        <ConfirmationDialog />
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
