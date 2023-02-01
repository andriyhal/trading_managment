import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

import ProfilesLayout from "../../../../components/profiles_layout";
import ProfileLayout from "../../../../components/profile_layout";
import BotForm from "../../../../components/bot";

const BotInfo = (props) => {
    const [orders, setOrders] = useState([]);
    const [defaultBotInfo, setDefaultBotInfo] = useState(null);
    const router = useRouter()

    const updateBotInfo = useCallback((info) => {
        axios.put(`/api/bots/${router.query.botId}`, info).then(resp => {
            console.log("saved", info)
        })
    }, [])

    useEffect(() => {
        if(router.query.botId){
            axios.get(`/api/bots/${router.query.profileId}/${router.query.botId}`).then(resp => {
                setOrders(resp.data.orders)
                setDefaultBotInfo(resp.data.botInfo)
            })
        }
    }, [router.query.botId])

    return <ProfilesLayout>
        <ProfileLayout>
            <BotForm defaultBotInfo={defaultBotInfo} fetcher={updateBotInfo}/>
            {orders?.length && orders.map(({id}) => id)}
        </ProfileLayout>
    </ProfilesLayout>
}

export default BotInfo