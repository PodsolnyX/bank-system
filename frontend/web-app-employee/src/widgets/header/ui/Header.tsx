import {Dropdown, MenuProps, Space, Typography} from "antd";
import logo from "../../../shared/assets/logo.png"
import {Link} from "react-router-dom";
import {Links} from "../../../constants/Links.ts";
import {DownOutlined, LoginOutlined, SunOutlined} from "@ant-design/icons";
import {MenuLinks} from "../constants/MenuLinks.ts";
import {useAuth} from "oidc-react";
import {useTheme} from "../../../app/providers/theme/ThemeProvider.tsx";

const Header = () => {

    const {userData} = useAuth()
    const {changeTheme} = useTheme();

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "theme") changeTheme()
    };


    return (
        <div className={"w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl my-6"}>
            <div className={"flex flex-wrap items-center gap-5 px-6 py-3 "}>
                <Link to={Links.Main} className={"flex items-center gap-1 no-underline"}>
                    <img src={logo} alt={"Лого"} width={32}/>
                    <div className={"flex flex-col justify-start items-end"}>
                        <Typography.Text strong className={"text-lg -mb-2 tracking-wide"}>
                            <span className={"text-lime-500 mr-1"}>Зелёный</span>
                            <span className={"dark:text-white"}>Банк</span>

                        </Typography.Text>
                        <Typography.Text strong className={"text-xs text-stone-400 tracking-wider"}>
                            Сотрудник
                        </Typography.Text>
                    </div>
                </Link>
                {
                    userData &&
                    <div className={"flex flex-wrap justify-between flex-1"}>
                        <div className={"flex gap-3"}>
                            {
                                MenuLinks.map((it, index) =>
                                    <Link to={it.link} className={"no-underline whitespace-nowrap"} key={index}>
                                        <Typography.Text strong className={"hover:text-lime-500 dark:text-white transition tracking-wide"}>{it.title}</Typography.Text>
                                    </Link>
                                )
                            }
                        </div>
                        <div>
                            <Dropdown menu={{ items, onClick }} className={"cursor-pointer"}>
                                <Space>
                                    <Typography.Text strong className={"tracking-wide dark:text-white"}>USER</Typography.Text>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const items: MenuProps['items'] = [
    {
        key: 'theme',
        label: "Поменять тему",
        icon: <SunOutlined />
    },
    {
        key: 'logout',
        label: <a href={"https://coto-dev.ru"}>Выйти</a>,
        danger: true,
        icon: <LoginOutlined/>
    },

];

export default Header;