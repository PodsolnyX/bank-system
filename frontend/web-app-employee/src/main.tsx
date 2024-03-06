import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./api/queryClient.ts";
import {AuthProvider} from "./app/providers/auth";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <AuthProvider>
                  <App />
              </AuthProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
