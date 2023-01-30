import {useCallback, useState} from "react";
import axios from "axios";
import {FormControl, Input} from "@mui/material";

const styles = {
    form: {
        width: 800,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        marginTop: 200
    },
    input: {
        width: 500,
        height: 41,
        color: '#000'
    },
    button: {
        width: 250,
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 700,
        fontSize: 22,
        color: '#fff',
        backgroundColor: '#367010',
        border: '2px solid #367010',
        borderRadius: 5,
        boxShadow: '0px 0px 20px #4f4f4f'
    }
}

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
            <button style={styles.button} type='submit' onClick={handleSubmit}>Login</button>
        </FormControl>
    )
}

export default AuthForm