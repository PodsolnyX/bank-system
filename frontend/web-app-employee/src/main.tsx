import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {App as AppAntd} from "antd"
import queryClient from "./shared/api/queryClient.ts";
import {oidcConfig} from "./app/providers/oidc/config.ts";
import {AuthProvider} from "oidc-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppAntd message={{ maxCount: 1 }}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider {...oidcConfig}>
                        <App/>
                    </AuthProvider>
                </QueryClientProvider>
            </AppAntd>
        </BrowserRouter>
    </React.StrictMode>
,
)
