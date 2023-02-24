import {createUseStyles} from "react-jss";

export const styles = {
    form: {
        width: 800,
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        marginTop: 150
    },
    input: {
        width: 640,
        height: 45,
        color: '#fff',
        backgroundColor: '#161a1e',
        border: '1px solid #161a1e',
        borderRadius: 5,
        paddingLeft: 10,
        boxShadow: '7px 7px 9px #3f3f3f',
    },
    buttonLogin: {
        width: 250,
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 700,
        fontSize: 22,
        color: '#ffea00',
        backgroundColor: '#000',
        border: '2px solid #000',
        borderRadius: 5,
        cursor: "pointer",
        boxShadow: '7px 7px 9px #3f3f3f'
    },
    wrapperProfiles: {
        paddingTop: 10,
        display: "flex",
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: 15
    },
    buttonProfiles: {
        minWidth: 24,
        fontWeight: 700,
        marginLeft: 10,
        fontSize: 18,
        color: '#000',
        backgroundColor: '#ffea00',
        border: '2px solid #ffea00',
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
        border: '2px solid #161a1e',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#161a1e',
        color: '#fff',
        boxShadow: '10px 10px 9px #3f3f3f'
    },
    titleProfiles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        fontSize: 24,
        fontWeight: 700,
        borderBottom: '2px solid #707070'
    },
    textStyleProfiles: {
        color: '#fff'
    },
    wrapperProfile: {
        width: 1000,
        height: 145,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        paddingLeft: 20
    },
    firstRowProfile: {
        fontSize: 27,
        fontWeight: 700
    },
    secondRowProfile: {
        minWidth: 500,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        fontWeight: 700,
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#161a1e',
        color: '#ffea00',
        marginBottom: 10,
        boxShadow: '6px 6px 9px #3f3f3f'
    },
    thirdRowProfile: {
        width: '100%',
        height: 40,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '2px solid #161a1e',
        backgroundColor: '#161a1e',
        color: '#ffea00',
        boxShadow: '6px 6px 9px #3f3f3f'
    },
    itemProfile: {
        fontWeight: 700,
        fontSize: 18
    },
    wrapperBots: {
        display: 'flex'
    },
    blockBots: {
        minWidth: 200,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: '2px solid #161a1e',
        borderRadius: 5,
        marginLeft: 20,
        backgroundColor: '#161a1e',
        boxShadow: '10px 10px 9px #3f3f3f'
    },
    titleBots: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 22,
        color: '#fff',
        borderBottom: '2px solid #707070'
    },
    buttonTradingBots: {
        minWidth: 24,
        fontWeight: 700,
        marginLeft: 10,
        fontSize: 18,
        color: '#000',
        backgroundColor: '#ffea00',
        border: '2px solid #ffea00',
        borderRadius: 5,
        cursor: "pointer"
    },
    preText: {
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
        marginTop: 15
    },
    formBot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCheckboxBot: {
        width: 300,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    checkboxBot: {
        color: '#fff'
    },
    checkboxTextBot: {
        fontWeight: 700,
        fontSize: 16,
        color: '#fff'
    },
    labelBot: {
        width: 270,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        marginBottom: 10
    },
    inputBot: {
        display: 'block',
        width: 270,
        paddingLeft: 10,
        boxSizing: 'border-box',
        fontSize: 22,
        color: '#fff',
        border: '1px solid #e0e0e0',
        outline: 'none',
        borderRadius: 4
    },
    typographyBot: {
        width: 100,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        color: '#fff',
        marginBottom: 3
    },
    buttonBot: {
        minWidth: 250,
        height: 40,
        marginTop: 15,
        marginBottom: 20,
        fontWeight: 700,
        fontSize: 20,
        color: '#000',
        backgroundColor: '#ffea00',
        border: '2px solid #ffea00',
        borderRadius: 5,
        cursor: "pointer"
    },
    wrapperCreateBotForm: {
        border: '1px solid #161a1e',
        backgroundColor: '#161a1e',
        borderRadius: 5,
        marginLeft: 300,
        boxShadow: '10px 10px 9px #3f3f3f'
    },
    titleCreateBotForm: {
        fontSize: 22,
        height: 50,
        fontWeight: 700,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: ' center',
        borderBottom: '2px solid #707070',
        marginBottom: 5
    },
    wrapperBotInfo: {
        width: 996,
        minHeight: 400,
        display: 'flex',
        textAlign: 'center',
        border: '2px solid #161a1e',
        borderRadius: 5,
        marginLeft: 20,
        backgroundColor: '#161a1e',
        boxShadow: '10px 10px 9px #3f3f3f'
    },
    blockBotInfo: {
        borderRight: '2px solid #707070'
    },
    wrapperOrders: {
        width: 635,
        margin: '0 auto',
        backgroundColor: '#161a1e'
    },
    headingTextBotInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 24,
        color: '#fff',
        margin: '5px 0'
    },
    rowOrderInfo: {
        width: 635,
        display: 'flex',
        justifyContent: 'space-between'
    },
    orderInfoItem: {
        height: 26,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: 14,
        border: '1px solid #000',
        color: '#fafafa',
        textAlign: 'left',
        paddingLeft: 5
    },
    time: {
        marginLeft: 7
    }
}

export const additionalStyles = createUseStyles({
    itemsOrderInfo: {
        width: 161
    },
    timeOrderInfo: {
        width: 320
    },
    titleBotInfo: {
        width: '100%',
        height: 45,
        borderBottom: '2px solid #707070',
        paddingBottom: 5
    },
    orders: {
        margin: '0 auto 10px'
    }
});