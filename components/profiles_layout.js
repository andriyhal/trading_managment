import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useRouter} from 'next/router'
import Check from "@mui/icons-material/Check";
import {styles} from "../styles/styles";

const ProfileRow = memo(({id, name}) => {
    const router = useRouter()

    const onSelectProfile = useCallback(() => {
        router.push(`/profiles/${id}`)
    }, [])

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton onClick={onSelectProfile}>
                {id === router.query.profileId ? <ListItemIcon style={styles.textStyleProfiles}>
                    <Check/>
                </ListItemIcon> : null}
                <ListItemText style={styles.textStyleProfiles} primary={name}/>
            </ListItemButton>
        </ListItem>
    )
})

const ProfilesLayout = ({children = null}) => {
    const [profiles, setProfiles] = useState([]);
    const router = useRouter()

    useEffect(() => {
        axios.get("/api/profiles").then(resp => {
            setProfiles(resp.data)
        })
    }, [])


    const onCreateProfileLinkClick = useCallback(() => {
        router.push(`/profiles/create_profile`)
    }, [])

    const profilesRender = useMemo(() => {
        return <> {profiles.map(profileInfo =>
            <ProfileRow {...profileInfo} key={profileInfo.id}/>)}</>
    }, [profiles])

    return (
        <Box style={styles.wrapperProfiles}>
            <Box style={styles.blockProfiles}>
                <Typography style={styles.titleProfiles}>
                    Profiles
                    <button style={styles.buttonProfiles} onClick={onCreateProfileLinkClick}>+</button>
                </Typography>
                {profiles.length ? <List> {profilesRender} </List> : null}
                {!profiles.length ? <Box style={styles.preText}> "Have not profiles yet" </Box> : null}
            </Box>
            {children && children}
        </Box>
    );
}

export default ProfilesLayout;