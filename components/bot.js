import React, {useCallback, useEffect, useState} from "react";
import {Box, Checkbox, FormControl, FormGroup, Input, Typography} from "@mui/material";

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCheckbox: {
        width: 300,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    checkboxText: {
        fontWeight: 700,
        fontSize: 16
    },
    label: {
        width: 270,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        display: 'block',
        width: 270,
        paddingLeft: 10,
        boxSizing: 'border-box',
        fontSize: 22,
        border: '1px solid #e0e0e0',
        outline: 'none',
        borderRadius: 4
    },
    typography: {
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        color: '#000'
    },
    buttonBot: {
        minWidth: 250,
        height: 40,
        marginTop: 15,
        fontWeight: 700,
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#367010',
        border: '2px solid #367010',
        borderRadius: 5,
        cursor: "pointer"
    }
}

const BotForm = ({fetcher, defaultBotInfo = null}) => {
    const [botInfo, setBotInfo] = useState({});

    const onSaveBotForm = useCallback((e) => {
        e.preventDefault()

        fetcher({info: botInfo})
    }, [botInfo])

    useEffect(() => {
        if (defaultBotInfo) {
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
        <FormGroup style={styles.form} method='post'>
            {console.log({botInfo})}
            <Box style={styles.containerCheckbox}>
                <Checkbox onChange={onBotInfoChange} defaultChecked={botInfo.isSellFirst} name='isSellFirst'
                          placeholder='Sell first' id='isSellFirst'/>
                <Typography style={styles.checkboxText}>isSellFirst</Typography>
            </Box>
            <Box style={styles.containerCheckbox}>
                <Checkbox onChange={onBotInfoChange}
                          defaultChecked={botInfo.isActive} name='isActive' placeholder='Active'/>
                <Typography style={styles.checkboxText}>isActive</Typography>
            </Box>
            <label style={styles.label}>
                <Typography style={styles.typography}>Buy price</Typography>
                <Input style={styles.input} onChange={onBotInfoChange} type='number'
                       value={botInfo.buyPrice} name='buyPrice' placeholder='Buy price'/>
            </label>
            <label style={styles.label}>
                <Typography style={styles.typography}>Sell price</Typography>
                <Input style={styles.input} onChange={onBotInfoChange} type='number'
                       value={botInfo.sellPrice} name='sellPrice' placeholder='Sell price'/>
            </label>
            <label style={styles.label}>
                <Typography style={styles.typography}>Buy quantity</Typography>
                <Input style={styles.input} onChange={onBotInfoChange} type='text'
                       value={botInfo.buyQuantity} name='buyQuantity'
                       placeholder='Buy quantity' id="buyQuantity"/>
            </label>
            <button style={styles.buttonBot} type='submit'
                    onClick={onSaveBotForm}>{defaultBotInfo ? "Update bot" : "Create bot"}</button>
        </FormGroup>
    )
}

export default BotForm