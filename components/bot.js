import React, {useCallback, useEffect, useState} from "react";
import {Box, Checkbox, FormGroup, Input, Typography} from "@mui/material";
import {styles} from "../styles/styles";

const BotForm = ({fetcher, defaultBotInfo = null}) => {
    const [botInfo, setBotInfo] = useState({});

    const onSaveBotForm = useCallback((e) => {
        e.preventDefault();

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
        <FormGroup style={styles.formBot} method='post'>
            <Box style={styles.containerCheckboxBot}>
                <Checkbox style={styles.checkboxBot} onChange={onBotInfoChange} defaultChecked={botInfo.isSellFirst}
                          name='isSellFirst' placeholder='Sell first' id='isSellFirst'/>
                <Typography style={styles.checkboxTextBot}>isSellFirst</Typography>
            </Box>
            <Box style={styles.containerCheckboxBot}>
                <Checkbox style={styles.checkboxBot} onChange={onBotInfoChange}
                          defaultChecked={botInfo.isActive} name='isActive' placeholder='Active'/>
                <Typography style={styles.checkboxTextBot}>isActive</Typography>
            </Box>
            <label style={styles.labelBot}>
                <Typography style={styles.typographyBot}>Buy price</Typography>
                <Input style={styles.inputBot} onChange={onBotInfoChange} type='number'
                       value={botInfo.buyPrice} name='buyPrice' placeholder='Buy price'/>
            </label>
            <label style={styles.labelBot}>
                <Typography style={styles.typographyBot}>Sell price</Typography>
                <Input style={styles.inputBot} onChange={onBotInfoChange} type='number'
                       value={botInfo.sellPrice} name='sellPrice' placeholder='Sell price'/>
            </label>
            <label style={styles.labelBot}>
                <Typography style={styles.typographyBot}>Buy quantity</Typography>
                <Input style={styles.inputBot} onChange={onBotInfoChange} type='text'
                       value={botInfo.buyQuantity} name='buyQuantity'
                       placeholder='Buy quantity' id="buyQuantity"/>
            </label>
            <button style={styles.buttonBot} type='submit'
                    onClick={onSaveBotForm}>{defaultBotInfo ? "Update bot" : "Create bot"}</button>
        </FormGroup>
    )
}

export default BotForm