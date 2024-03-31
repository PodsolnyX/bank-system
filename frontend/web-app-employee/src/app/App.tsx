import Router from "./providers/router.tsx";
import Layout from "../widgets/layout/Layout.tsx";
import "./styles/index.css"
import {useAuth} from "oidc-react";
import {Spin} from "antd";
import {useSignalR} from "../shared/hooks/useSignalR.ts";
import ThemeProvider from "./providers/theme/ThemeProvider.tsx";
function App() {

    const { isLoading: isAuthLoading, userData } = useAuth()

    useSignalR();

    if (isAuthLoading) return <Spin/>

    return (
        <ThemeProvider>
            <Layout>
                <Router/>
            </Layout>
        </ThemeProvider>
    )
}

export default App
