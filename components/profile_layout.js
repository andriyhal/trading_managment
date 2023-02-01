import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import { useRouter } from 'next/router'
import {PLATFORMS} from "../constants";

const BotRow = memo(({ botStrategySpotLimitId, isActive, pair, profileId, profit, id }) => {
    const router = useRouter()

    const onBotSelect = useCallback(() => {
        router.push(`/profiles/${router.query.profileId}/${id}`)
    }, [id])

    return (
        <ListItem key={id} component="div" disablePadding>
            <ListItemButton onClick={onBotSelect}>
                <ListItemText primary={pair} />
            </ListItemButton>
        </ListItem>
    )
})

const ProfileLayout = ({children = null}) => {
    const [bots, setBots] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const router = useRouter()

    useEffect(() => {
        if(router.query.profileId){
            axios.get(`/api/bots/${router.query.profileId}`).then(resp => {
                setBots(resp.data)
            })

            axios.get(`/api/profiles/${router.query.profileId}`).then(resp => {
                setProfileInfo(resp.data)
            })
        }
    }, [router.query.profileId])

    const botsRender = useMemo(() => {
        return bots.map( botInfo => <BotRow {...botInfo} />)
    }, [bots])

    const profileBalance = useMemo(() => {
        if(profileInfo.balance) {
            return profileInfo.balance.reduce((acc, {coin, free}) => {
                return `${acc}${coin}: ${free}; `
            }, "")
        }

        return ""
    }, [profileInfo.balance])

    return (
        <>
            <Box>
                <Box
                    sx={{
                        width: "100%",
                        height: 200,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        {"Profile info"}
                    </Typography>
                    <Typography gutterBottom>
                        {`Platform: ${PLATFORMS[profileInfo.platformId]}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Balance: ${profileBalance}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Profile api key: *****${profileInfo.apiKey}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`Profile name: ${profileInfo.profileName}`}
                    </Typography>
                </Box>
                {bots.length &&  <List
                    sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
                >
                    {botsRender}
                </List>}
                {!bots.length && <>{"Have not profiles yet"}</>}
            </Box>

            <div>
                {children && children}
            </div>
        </>
    );
}

export default ProfileLayout;
