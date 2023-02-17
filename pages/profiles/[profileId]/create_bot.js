import React, {useCallback} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import {styles} from "/styles/styles";

import ProfilesLayout from "../../../components/profiles_layout";
import ProfileLayout from "../../../components/profile_layout";
import BotForm from "../../../components/bot";

const CreateBotForm = () => {
    const router = useRouter()

    const createBot = useCallback(({info}) => {
        axios.post(`/api/bots/${router.query.profileId}`, {
            ...info,
            isSellFirst: !!info.isSellFirst,
            isActive: !!info.isActive,
            pair: "USDTUAH",
            profileId: router.query.profileId
        }).then(resp => {
            router.push(`/profiles/${router.query.profileId}/${resp.data.id}`)
        })
    }, [router.query.profileId])

    return <ProfilesLayout>
        <ProfileLayout>
            <Box style={styles.wrapperCreateBotForm}>
                <Typography style={styles.titleCreateBotForm}>
                    {"Create bot form"}
                </Typography>
                <BotForm fetcher={createBot}/>
            </Box>
        </ProfileLayout>
    </ProfilesLayout>
}

export default CreateBotForm;