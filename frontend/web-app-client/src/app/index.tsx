import { getToken } from "firebase/messaging";
import { useAuth } from 'oidc-react'
import { useEffect } from "react";
import { BanPage } from 'pages/ban'
import { ErrorPage } from 'pages/error'
import { useTheme } from 'features/preferences'
import { useGetHiddenAccountsQuery } from 'entities/preferences'
import { useGetAccessInfoQuery } from 'entities/user'
import { Spinner } from 'shared/ui'

import { messaging } from "./firebase";
import { StoreProvider, Toaster, AppAuthProvider, AntdProvider } from './providers'
import { ApplicationRouter } from './router'
import './styles/index.scss'


async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: 'BF5uUatJxEY07grBcr9rI4rNISVtrioC9O_PBgR_YWTMiMZjggaMwGfjA2Hl-pnJsV1M9CiAHj_PwUb_CWFyyNs',
    });
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    console.log("You denied for the notification");
  }
}

function App() {
  useTheme()
  const { isLoading: isAuthLoading, userData } = useAuth()

  const hiddenAccs = useGetHiddenAccountsQuery(undefined, { skip: !userData })

  const accessQuery = useGetAccessInfoQuery(
    { userid: userData?.profile.sub || '' },
    { skip: !userData?.profile.sub }
  )

  const isLoading = isAuthLoading || hiddenAccs.isFetching || accessQuery.isFetching
  const isError = hiddenAccs.isError || accessQuery.isError
  const isBanned = accessQuery.data?.bannedAt !== null

  useEffect(() => {
    requestPermission()
  },[])
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorPage />
  ) : isBanned ? (
    <BanPage />
  ) : (
    <>
      <Toaster />
      <ApplicationRouter />
    </>
  )
}

const WrappedApp = () => {
  return (
    <StoreProvider>
      <AppAuthProvider>
        <AntdProvider>
          <App />
        </AntdProvider>
      </AppAuthProvider>
    </StoreProvider>
  )
}

export default WrappedApp
