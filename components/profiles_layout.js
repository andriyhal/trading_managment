import {memo, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { useRouter } from 'next/router'
import {styles} from "../styles";

const ProfileRow = memo(({ id, name }) => {
    const router = useRouter()

    const onSelectProfile = useCallback(() => {
        router.push(`/profiles/${id}`)
    }, [])

    return (
        <ListItem key={id} component="div" disablePadding>
            <ListItemButton onClick={onSelectProfile}>
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
        return <>{profiles.map( profileInfo => <ProfileRow {...profileInfo} />)}</>
    }, [profiles])

    return (
        <>
            <button style={styles.button} onClick={onCreateProfileLinkClick}>Create profile</button>
            <Box>
                {profiles.length &&  <List
                    sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
                >
                    {profilesRender}
                </List>}
                {!profiles.length && <>"Have not profiles yet"</>}
            </Box>

            <div>
                {children && children}
            </div>
        </>
    );
}

export default ProfilesLayout;
