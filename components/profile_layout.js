import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import { useRouter } from 'next/router'
import Check from '@mui/icons-material/Check';
import {PLATFORMS} from "../constants";
import {styles} from "../styles/styles";

const BotRow = memo(({ botStrategySpotLimitId, isActive, pair, profileId, profit, id }) => {
    const router = useRouter()

    const onBotSelect = useCallback(() => {
        router.push(`/profiles/${router.query.profileId}/${id}`)
    }, [id])

    return (
        <ListItem key={id} component="div" disablePadding>
            <ListItemButton onClick={onBotSelect}>
                {id === router.query.botId ? <ListItemIcon>
                    <Check />
                </ListItemIcon> : null}
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
        return bots.map( botInfo => <BotRow {...botInfo} key={botInfo.id}/>)
    }, [bots])

    const onCreateBotLinkClick = useCallback(() => {
        router.push(`/profiles/${router.query.profileId}/create_bot`)
    }, [])

    const profileBalance = useMemo(() => {
        if(profileInfo.balance) {
            return profileInfo.balance.reduce((acc, {coin, free}) => {
                return `${acc}${coin}: ${free}; `
            }, "")
        }

        return ""
    }, [profileInfo.balance])

    return (
        <Box  sx={{
            flex: 1,
        }}>
            <Box
                sx={{
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
            <Box  sx={{
                display: "flex",
            }}>
                <Box sx={{
                    minWidth: 250,
                }}>
                    <Typography variant="h6" gutterBottom>
                        {"Trading bots"}
                        <button style={styles.smallButton} onClick={onCreateBotLinkClick}>+</button>
                    </Typography>
                    {bots.length ?  <List
                        sx={{ minWidth: 250, bgcolor: 'background.paper' }}
                    >
                        {botsRender}
                    </List> : null}
                    {!bots.length ? <>{"Have not bots yet"}</> : null}
                </Box>
                <Box sx={{
                        flex: 1,
                    }}>
                    {children && children}
                </Box>
            </Box>

        </Box>
    );
}

export default ProfileLayout;
