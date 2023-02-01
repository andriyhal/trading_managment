import React from "react";
import ProfilesLayout from "../../../../components/profiles_layout";
import ProfileLayout from "../../../../components/profile_layout";
import BotForm from "../../../../components/bot";

const BotInfo = (props) => {
    return <ProfilesLayout><ProfileLayout><BotForm/></ProfileLayout></ProfilesLayout>
}

export default BotInfo