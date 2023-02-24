import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import {styles, additionalStyles} from "/styles/styles";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProfilesLayout from "../../../../components/profiles_layout";
import ProfileLayout from "../../../../components/profile_layout";
import BotForm from "../../../../components/bot";
import Time from "../../../../components/time";

const BotInfo = () => {
    const [orders, setOrders] = useState([]);
    const [defaultBotInfo, setDefaultBotInfo] = useState(null);
    const router = useRouter();

    const styleOrders = additionalStyles();

    const updateBotInfo = useCallback(({info}) => {
        axios.put(`/api/bots/${router.query.profileId}/${router.query.botId}`, {
            ...info, isActive: !!info.isActive, isSellFirst: !!info.isSellFirst,
        }).then((resp) => {
            console.log(resp)
            if (resp.statusText === "OK") {
                toast("Bot info updated!")
            }
        })
    }, [router.query.profileId, router.query.botId])

    useEffect(() => {
        if (router.query.botId) {
            axios.get(`/api/bots/${router.query.profileId}/${router.query.botId}`).then(resp => {
                setOrders(resp.data.orders)
                setDefaultBotInfo(resp.data.botInfo)
            })
        }
    }, [router.query.botId, router.query.profileId])

    return <ProfilesLayout>
        <ProfileLayout>
            <Box style={styles.wrapperBotInfo}>
                <Box style={styles.blockBotInfo}>
                    <Typography style={styles.headingTextBotInfo} className={styleOrders.titleBotInfo}>
                        {"Bot info"}
                    </Typography>
                    <BotForm defaultBotInfo={defaultBotInfo} fetcher={updateBotInfo}/>
                    <ToastContainer theme="dark" autoClose={4000}/>
                </Box>
                <Box style={styles.wrapperOrders}>
                    <Typography style={styles.headingTextBotInfo}>
                        {"Orders"}
                    </Typography>
                    <Box>
                        {orders?.length ? orders.map(({id, createdAt, closedAt, sum, isBuy, price, isCancel}) =>
                            <Box style={{backgroundColor: isBuy ? '#0ecb81' : '#f6465d'}}
                                 className={styleOrders.orders} key={id}>
                                <Box style={styles.rowOrderInfo}>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.itemsOrderInfo}>
                                        Side: {(isBuy ? 'BUY' : 'SELL')}
                                    </Typography>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.itemsOrderInfo}>
                                        Status: {(isCancel ? 'CANCELED' : 'SUCCESS')}
                                    </Typography>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.itemsOrderInfo}>
                                        Price: {price}
                                    </Typography>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.itemsOrderInfo}>
                                        Quantity: {sum}$
                                    </Typography>
                                </Box>
                                <Box style={styles.rowOrderInfo}>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.timeOrderInfo}>
                                        Open time: <Time dateString={createdAt}/>
                                    </Typography>
                                    <Typography style={styles.orderInfoItem}
                                                className={styleOrders.timeOrderInfo}>
                                        Closed time: {(closedAt ? <Time dateString={closedAt} /> : '')}
                                    </Typography>
                                </Box>
                            </Box>) : <Typography style={styles.preText}>"No orders yet"</Typography>}
                    </Box>
                </Box>
            </Box>
        </ProfileLayout>
    </ProfilesLayout>
}

export default BotInfo