import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import { useRouter } from 'next/router'
import {styles} from "../styles/styles";
import Check from "@mui/icons-material/Check";

const profilesLayoutStyles = {
    display: "flex",
    flex: 1
}

const ProfileRow = memo(({ id, name }) => {
    const router = useRouter()

    const onSelectProfile = useCallback(() => {
        router.push(`/profiles/${id}`)
    }, [])

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton onClick={onSelectProfile}>
                {id === router.query.profileId ? <ListItemIcon>
                    <Check />
                </ListItemIcon> : null}
                <ListItemText primary={name} />
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
        return <>{profiles.map( profileInfo => <ProfileRow {...profileInfo} key={profileInfo.id}/>)}</>
    }, [profiles])

    return (
        <Box sx={profilesLayoutStyles}>
            <Box sx={{ minWidth: 250}}>
                <Typography variant="h5" gutterBottom>
                    Profiles
                    <button style={styles.smallButton} onClick={onCreateProfileLinkClick}>+</button>
                </Typography>
                {profiles.length ?  <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                >
                    {profilesRender}
                </List> : null}
                {!profiles.length ? <>{"Have not profiles yet"}</> : null}
            </Box>

            {children && children}
        </Box>
    );
}

export default ProfilesLayout;
