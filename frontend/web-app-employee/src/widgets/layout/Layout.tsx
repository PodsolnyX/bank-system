import React from "react";
import Header from "../header";
import {Button} from "antd";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

    const {
        children
    } = props;

    return (
        <div className={"min-h-screen flex justify-center bg-lime-200 dark:bg-gray-950"}>
            <div className={"max-w-[1100px] w-full"}>
                <Header/>
                <Button onClick={() => {
                    document.body.classList.toggle('dark')
                }}>Тема</Button>
                <div className={"w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl my-6"}>
                    <div className={"p-6"}>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;