import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Checkbox, FormControl, Input} from "@mui/material";

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

const BotForm = ({fetcher, defaultBotInfo = null}) => {
    const [botInfo, setBotInfo] = useState({});

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        fetcher({info: botInfo})
    }, [botInfo])

    useEffect(() => {
        if(defaultBotInfo){
            setBotInfo(defaultBotInfo)
        }
    }, [defaultBotInfo])

    const onBotInfoChange = useCallback((e) => {

        setBotInfo(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    }, [botInfo])

    return (
        <FormControl style={styles.form} method='post'>
            <Checkbox style={styles.checkbox} onChange={onBotInfoChange}
                   defaultValue={botInfo.isSellFirst} name='isSellFirst' placeholder='Sell first'/>
            <Checkbox style={styles.checkbox} onChange={onBotInfoChange}
                      defaultValue={botInfo.isActive} name='isActive' placeholder='Active'/>
            <Input style={styles.input} onChange={onBotInfoChange}
                   type='number' defaultValue={botInfo.buyPrice} name='buyPrice' placeholder='Buy price'/>
            <Input style={styles.input} onChange={onBotInfoChange}
                   type='number' defaultValue={botInfo.sellPrice} name='sellPrice' placeholder='Sell price'/>
            <button style={styles.button} type='submit' onClick={handleSubmit}>{defaultBotInfo ? "Update bot" : "Create bot"}</button>
        </FormControl>
    )
}

export default BotForm