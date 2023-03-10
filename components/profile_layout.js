import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useRouter} from 'next/router'
import Check from '@mui/icons-material/Check';
import {PLATFORMS} from "../constants";
import {styles} from "../styles/styles";

const BotRow = memo(({botStrategySpotLimitId, isActive, pair, profileId, profit, id}) => {
    const router = useRouter()

    const onBotSelect = useCallback(() => {
        router.push(`/profiles/${router.query.profileId}/${id}`)
    }, [id])

    return (
        <ListItem key={id} component="div" disablePadding>
            <ListItemButton onClick={onBotSelect}>
                {id === router.query.botId ? <ListItemIcon style={styles.textStyleProfiles}>
                    <Check/>
                </ListItemIcon> : null}
                <ListItemText style={styles.textStyleProfiles} primary={pair}/>
            </ListItemButton>
        </ListItem>
    )
})

const ProfileLayout = ({children = null}) => {
    const [bots, setBots] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (router.query.profileId) {
            axios.get(`/api/bots/${router.query.profileId}`).then(resp => {
                setBots(resp.data)
            })

            axios.get(`/api/profiles/${router.query.profileId}`).then(resp => {
                setProfileInfo(resp.data)
            })
        }
    }, [router.query.profileId])

    const botsRender = useMemo(() => {
        return bots.map(botInfo => <BotRow {...botInfo} key={botInfo.id}/>)
    }, [bots])

    const onCreateBotLinkClick = useCallback(() => {
        router.push(`/profiles/${router.query.profileId}/create_bot`)
    }, [])

    const profileBalance = useMemo(() => {
        if (profileInfo.balance) {
            return profileInfo.balance.reduce((acc, {coin, free}) => {
                return `${acc}${coin}: ${free}; `
            }, "")
        }

        return ""
    }, [profileInfo.balance])

    return (
        <Box>
            <Box style={styles.wrapperProfile}>
                <Typography style={styles.firstRowProfile}>
                    {"Profile info"}
                </Typography>
                <Typography style={styles.secondRowProfile}>
                    {`Balance: ${profileBalance}`}
                </Typography>
                <Box style={styles.thirdRowProfile}>
                    <Typography style={styles.itemProfile}>
                        {`Platform: ${PLATFORMS[profileInfo.platformId]}`}
                    </Typography>
                    <Typography style={styles.itemProfile}>
                        {`Profile api key: *****${profileInfo.apiKey}`}
                    </Typography>
                    <Typography style={styles.itemProfile}>
                        {`Profile name: ${profileInfo.profileName}`}
                    </Typography>
                </Box>
            </Box>
            <Box style={styles.wrapperBots}>
                <Box style={styles.blockBots}>
                    <Typography style={styles.titleBots}>
                        {"Trading bots"}
                        <button style={styles.buttonTradingBots} onClick={onCreateBotLinkClick}>+</button>
                    </Typography>
                    {bots.length ? <List> {botsRender} </List> : null}
                    {!bots.length ? <Box style={styles.preText}>"Have not bots yet"</Box> : null}
                </Box>
                <Box>
                    {children && children}
                </Box>
            </Box>
        </Box>
    );
}

export default ProfileLayout;