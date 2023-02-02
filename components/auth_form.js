import {useCallback, useState} from "react";
import axios from "axios";
import {FormControl, Input} from "@mui/material";
import {styles} from "../styles/styles";

const AuthForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/api/auth',
            data: {userName, password}
        }).then(res => console.log(res.data))
    }, [userName, password])

    const handleUserName = useCallback((e) => {
        setUserName(e.currentTarget.value)
    }, [setUserName])

    const handlePassword = useCallback((e) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    return (
        <FormControl style={styles.form} method='post'>
            <Input style={styles.input} onChange={handleUserName} onKeyDown={handleKeyPress}
                   type='text' value={userName} name='user_name' placeholder='User name'/>
            <Input style={styles.input} onChange={handlePassword} onKeyDown={handleKeyPress}
                   type='password' value={password} name='password' placeholder='Password'/>
            <button style={styles.largeButton} type='submit' onClick={handleSubmit}>Login</button>
        </FormControl>
    )
}

export default AuthForm