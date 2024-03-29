import Router from "./providers/router.tsx";
import Layout from "../widgets/layout/Layout.tsx";
import "./styles/index.css"
import {useAuth} from "oidc-react";
import {Spin} from "antd";
import {useSignalR} from "../shared/hooks/useSignalR.ts";
function App() {

    const { isLoading: isAuthLoading, userData } = useAuth()

    useSignalR();

    if (isAuthLoading) return <Spin/>

    return (
        <Layout>
            <Router/>
        </Layout>
    )
}

export default App
