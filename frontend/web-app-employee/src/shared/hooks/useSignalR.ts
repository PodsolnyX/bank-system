import {useCallback, useEffect, useState} from "react";
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
                .withUrl("http://109.107.189.133:7004/api/notifications", {
                    accessTokenFactory: () => {
                        return user.userData?.access_token || ""
                    }
                })
                .withAutomaticReconnect(Array(100).fill(10))
                .build();

            setConnection(newConnection);
        }
        else if (!user.userData && connection) {
            connection.stop().then(() => {
                setConnection(null);
            })
        }

    }, [user.userData])

    // useEffect(() => {
    //
    //     if (connection) {
    //         connection.start().then(function () {
    //             connection.on('ReceiveMessage', function (message) {
    //
    //                 const newMessage = JSON.parse(message)
    //                 console.log(newMessage);
    //
    //                 queryClient.invalidateQueries({ queryKey: operationHistoryQueryKeys.history({}) } )
    //
    //             });
    //
    //
    //         }).catch(function (err) {
    //             return console.error(err.toString());
    //         });
    //     }
    // }, [connection])

    const start = useCallback(async () => {
        if (connection) {
            try {
                await connection.start()
                console.log('SignalR Connected.')
                connection.on('ReceiveMessage', function (message) {

                    const newMessage = JSON.parse(message)
                    console.log(newMessage);

                    queryClient.invalidateQueries({queryKey: operationHistoryQueryKeys.history({})})

                });
            } catch (err) {
                console.log('err')
                setTimeout(start)
            }
        }
    }, [connection])

    useEffect(() => {
        start()
    }, [connection]);

}

