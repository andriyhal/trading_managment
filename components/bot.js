import React, {useCallback, useEffect, useState} from "react";
import {Checkbox, FormControl, FormGroup, Input} from "@mui/material";
import {styles} from "../styles/styles";

const BotForm = ({fetcher, defaultBotInfo = null}) => {
    const [botInfo, setBotInfo] = useState({});

    const onSaveBotForm = useCallback((e) => {
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
        <FormGroup method='post'>
            {console.log({botInfo})}
            <Checkbox onChange={onBotInfoChange} defaultChecked={botInfo.isSellFirst} name='isSellFirst' placeholder='Sell first' id='isSellFirst'/>
            <Checkbox onChange={onBotInfoChange}
                      defaultChecked={botInfo.isActive} name='isActive' placeholder='Active'/>
            <Input onChange={onBotInfoChange}
                   type='number' value={botInfo.buyPrice} name='buyPrice' placeholder='Buy price'/>
            <Input onChange={onBotInfoChange}
                   type='number' value={botInfo.sellPrice} name='sellPrice' placeholder='Sell price'/>
            <Input onChange={onBotInfoChange}
                   type='text'  name='buyQuantity' value={botInfo.buyQuantity} placeholder='Buy quantity' id="buyQuantity"/>
            <button style={styles.smallButton} type='submit' onClick={onSaveBotForm}>{defaultBotInfo ? "Update bot" : "Create bot"}</button>
        </FormGroup>
    )
}

export default BotForm