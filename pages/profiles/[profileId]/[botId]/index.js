import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Box, Typography} from "@mui/material";

import ProfilesLayout from "../../../../components/profiles_layout";
import ProfileLayout from "../../../../components/profile_layout";
import BotForm from "../../../../components/bot";

const BotInfo = (props) => {
    const [orders, setOrders] = useState([]);
    const [defaultBotInfo, setDefaultBotInfo] = useState(null);
    const router = useRouter()

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
        if(router.query.botId){
            axios.get(`/api/bots/${router.query.profileId}/${router.query.botId}`).then(resp => {
                setOrders(resp.data.orders)
                setDefaultBotInfo(resp.data.botInfo)
            })
        }
    }, [router.query.botId, router.query.profileId])

    return <ProfilesLayout>
        <ProfileLayout>
            <Box sx={{
                display: "flex",
            }}>
            <Box>
                <Typography variant="h6" gutterBottom>
                    {"Bot info"}
                </Typography>
                <BotForm defaultBotInfo={defaultBotInfo} fetcher={updateBotInfo}/>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    {"Orders"}
                </Typography>
                {orders?.length ? orders.map(({id}) => id) : "No orders yet"}
            </Box>
            </Box>
        </ProfileLayout>
    </ProfilesLayout>
}

export default BotInfo