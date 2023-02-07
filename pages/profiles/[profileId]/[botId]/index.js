import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import {createUseStyles} from "react-jss";

import ProfilesLayout from "../../../../components/profiles_layout";
import ProfileLayout from "../../../../components/profile_layout";
import BotForm from "../../../../components/bot";

const styles = {
    wrapperBotInfo: {
        width: 1000,
        minHeight: 400,
        display: 'flex',
        textAlign: 'center',
        border: '2px solid #000',
        borderRadius: 5,
        marginLeft: 20
    },
    blockBotInfo: {
        borderRight: '2px solid #000'
    },
    wrapperOrders: {
        width: 620,
        margin: '0 auto'
    },
    ordersBlock: {
        width: 500,
    },
    headingText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 24
    },
    rowOrderInfo: {
        width: 620,
        display: 'flex',
        justifyContent: 'space-between'
    },
    orderInfoItem: {
        height: 26,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 14,
        border: '1px solid #595959',
        color: '#000',
        textAlign: 'left',
        paddingLeft: 5
    },
    orders: {
        margin: '0 auto 15px',
    }
}

const useStyles = createUseStyles({
    itemsOrderInfo: {
        width: 150
    },
    lastItemOrderInfo: {
        width: 320
    },
    titleBotInfo: {
        width: '100%',
        height: 50,
        borderBottom: '2px solid #000'
    }
});

const BotInfo = (props) => {
    const [orders, setOrders] = useState([]);
    const [defaultBotInfo, setDefaultBotInfo] = useState(null);
    const router = useRouter()

    const itemsOrders = useStyles();

    const updateBotInfo = useCallback(({info}) => {
        axios.put(`/api/bots/${router.query.profileId}/${router.query.botId}`, {
            ...info,
            isActive: !!info.isActive,
            isSellFirst: !!info.isSellFirst,
        }).then((resp) => {
            console.log(resp.data, info)
            alert("Bot info updated")
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
                    <Typography style={styles.headingText} className={itemsOrders.titleBotInfo}>
                        {"Bot info"}
                    </Typography>
                    <BotForm defaultBotInfo={defaultBotInfo} fetcher={updateBotInfo}/>
                </Box>
                <Box style={styles.wrapperOrders}>
                    <Typography style={styles.headingText}>
                        {"Orders"}
                    </Typography>
                    <Box style={styles.ordersBlock}>
                        {orders?.length ? orders.map(({id, createdAt, closedAt, sum, isBuy, price}) =>
                                <Box style={styles.orders} key={id}>
                                    <Box style={styles.rowOrderInfo}>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.itemsOrderInfo}>
                                            Side: {(isBuy ? 'Buy' : 'Sell')}
                                        </Typography>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.itemsOrderInfo}>
                                            Order id: {id}
                                        </Typography>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.lastItemOrderInfo}>
                                            Open time: {createdAt}
                                        </Typography>
                                    </Box>
                                    <Box style={styles.rowOrderInfo}>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.itemsOrderInfo}>
                                            Price: {price}
                                        </Typography>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.itemsOrderInfo}>
                                            Quantity: {sum}$
                                        </Typography>
                                        <Typography style={styles.orderInfoItem}
                                                    className={itemsOrders.lastItemOrderInfo}>
                                            Closed time: {closedAt}
                                        </Typography>
                                    </Box>
                                </Box>)
                            : "No orders yet"}
                    </Box>
                </Box>
            </Box>
        </ProfileLayout>
    </ProfilesLayout>
}

export default BotInfo