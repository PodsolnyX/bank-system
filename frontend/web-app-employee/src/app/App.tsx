import Router from "./providers/router.tsx";
import Layout from "../widgets/layout/Layout.tsx";
import "./styles/index.css"
import {useAuth} from "oidc-react";
import {Spin} from "antd";
function App() {

    const { isLoading: isAuthLoading, userData } = useAuth()

    console.log(userData)

    if (isAuthLoading) return <Spin/>

    return (
        <Layout>
            <Router/>
        </Layout>
    )
}

export default App
