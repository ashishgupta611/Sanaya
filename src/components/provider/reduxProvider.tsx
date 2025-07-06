'use client';

import React, { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/src/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from '@/src/components/core/toast';
import LoadingOverlay from '@/src//components/core/loadingOverlay';
import ConfirmationDialog from '@/src//components/core/confirmationDialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { Toaster } from '../ui/toaster';

const ReduxProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toast />
          <LoadingOverlay />
          <ConfirmationDialog />
          <TooltipProvider>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
