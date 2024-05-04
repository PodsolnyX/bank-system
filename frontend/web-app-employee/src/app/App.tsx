import Router from "./providers/router.tsx";
import Layout from "../widgets/layout/Layout.tsx";
import "./styles/index.css"
import { getToken } from "firebase/messaging";
import {useAuth} from "oidc-react";
import {Spin} from "antd";
import {useSignalR} from "../shared/hooks/useSignalR.ts";
import ThemeProvider from "./providers/theme/ThemeProvider.tsx";
import {messaging} from "./firebase";
import {useEffect} from "react";
import {useSetupInstanceInterceptors} from "../shared/api/useSetupInstanceInterceptors.ts";

async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: 'BF5uUatJxEY07grBcr9rI4rNISVtrioC9O_PBgR_YWTMiMZjggaMwGfjA2Hl-pnJsV1M9CiAHj_PwUb_CWFyyNs',
        });
        console.log("Token generated : ", token);
    } else if (permission === "denied") {
        alert("You denied for the notification");
    }
}

function App() {

    const { isLoading: isAuthLoading, userData } = useAuth()

    useSignalR();

    useEffect(() => {
        requestPermission()
    },[])

    useSetupInstanceInterceptors()

    console.log(userData)

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
