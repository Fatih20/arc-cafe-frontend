import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes';

function App() {
  const queryClient = new QueryClient({
    defaultOptions : {
      queries : {
        retry : (failureCount, error : any) => {
          if (error?.response?.status === 401) {
            return false
          }
          return failureCount < 5;
        }
      }
    }
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
}

export default App;
