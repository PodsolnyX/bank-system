import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./shared/api/queryClient.ts";
import {oidcConfig} from "./app/providers/oidc/config.ts";
import {AuthProvider} from "oidc-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider {...oidcConfig}>
                    <App/>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
,
)
