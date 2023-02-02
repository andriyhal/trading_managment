import React, {useCallback, useState} from "react";
import {FormControl, Input, MenuItem, Select} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";

import ProfilesLayout from "../../components/profiles_layout";
import {styles} from "../../styles/styles";
import {PLATFORMS} from "../../constants";

const platformsRows = Object.keys(PLATFORMS).map(platformId => <MenuItem value={platformId}>{PLATFORMS[platformId]}</MenuItem>)

const CreateProfileForm = () => {
    const [profileFormInfo, setProfileFormInfo] = useState({
        platformId: Object.keys(PLATFORMS)[0]
    });

    const router = useRouter()

    const onCreateProfile = useCallback(async (e) => {
        e.preventDefault()

        const profileInfo = await axios({
            method: 'post',
            data: profileFormInfo,
            url: '/api/profiles',
        })

        router.push(`/profiles/${profileInfo.data.id}`)
    }, [profileFormInfo])

    const handleProfileInfoChange = useCallback((e) => {
        setProfileFormInfo(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    }, [setProfileFormInfo, profileFormInfo])

    return (
        <FormControl style={styles.form} method='post'>
            <Input style={styles.input} onChange={handleProfileInfoChange}
                   type='text' name='profileName' placeholder='Profile name' id="profileName"/>
            <Select
                labelId="platformId"
                id="platformId"
                value={profileFormInfo.platformId}
                label="Platform"
                name='platformId'
                onChange={handleProfileInfoChange}
            >
                {platformsRows}
            </Select>
            <Input style={styles.input} onChange={handleProfileInfoChange}
                   type='text' name='apiKey' placeholder='Api key' id="apiKey"/>
            <Input style={styles.input} onChange={handleProfileInfoChange}
                   type='text'  name='secretKey' placeholder='Secret key' id="secretKey"/>
            <button style={styles.smallButton} type='submit' onClick={onCreateProfile}>Create</button>
        </FormControl>
    )
}

const CreateProfilePage = (props) => {
    return <ProfilesLayout>
        <CreateProfileForm/>
    </ProfilesLayout>
}

export default CreateProfilePage
