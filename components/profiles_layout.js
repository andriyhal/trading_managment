import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useRouter} from 'next/router'
import Check from "@mui/icons-material/Check";

const styles = {
    wrapperProfiles: {
        display: "flex",
        marginLeft: 10
    },
    buttonProfiles: {
        minWidth: 24,
        fontWeight: 700,
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#000',
        border: '2px solid #000',
        borderRadius: 5,
        cursor: "pointer"
    },
    blockProfiles: {
        minWidth: 230,
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
        border: '2px solid #000',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 5
    },
    titleProfiles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        fontSize: 24,
        fontWeight: 700,
        borderBottom: '2px solid #000'
    },
    profileRow: {
        height: 20
    }
}

const ProfileRow = memo(({id, name}) => {
    const router = useRouter()

    const onSelectProfile = useCallback(() => {
        router.push(`/profiles/${id}`)
    }, [])

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton onClick={onSelectProfile}>
                {id === router.query.profileId ? <ListItemIcon>
                    <Check/>
                </ListItemIcon> : null}
                <ListItemText primary={name}/>
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
                {!profiles.length ? <> {"Have not profiles yet"} </> : null}
            </Box>
            {children && children}
        </Box>
    );
}

export default ProfilesLayout;
