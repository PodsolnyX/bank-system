import {useEffect, useState} from "react";
import {useAuth} from "oidc-react";
import * as signalR from "@microsoft/signalr";
import {useQueryClient} from "@tanstack/react-query";
import {operationHistoryQueryKeys} from "../../services/operationHistory/operationHistoryQueryKeys.ts";

export function useSignalR() {

    const user = useAuth();
    const queryClient = useQueryClient();
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        if (!!user.userData) {

            const newConnection = new signalR.HubConnectionBuilder()
                // @ts-ignore
                .withUrl("http://109.107.189.133:7004/api/notifications", {
                    accessTokenFactory: () => {
                        return localStorage.getItem("accessToken")
                    }
                })
                .withAutomaticReconnect([0, 2, 10, 30, 60, 180, 300, 360])
                .build();

            setConnection(newConnection);
        }
        else if (!user.userData && connection) {
            connection.stop().then(() => {
                setConnection(null);
            })
        }

    }, [user.userData])

    useEffect(() => {

        if (connection) {
            connection.start().then(function () {
                connection.on('ReceiveMessage', function (message) {

                    const newMessage = JSON.parse(message)
                    console.log(newMessage);

                    queryClient.invalidateQueries({ queryKey: operationHistoryQueryKeys.history({}) } )

                });


            }).catch(function (err) {
                return console.error(err.toString());
            });
        }
    }, [connection])

}