'use client'

import { apiRequest } from "@/helper/api.helper";
import { login, setUser } from "@/lib/redux/slices/auth.slice";
import { getAccessToken } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setActiveChannel } from "@/lib/redux/slices/channel.slice";

const TokenVerify = () => {
    const token = getAccessToken();
    const dispatch = useDispatch();
    const getUserInfo = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_GET_USER_INFO_API}`
        const res = token && await apiRequest("get", PATH)
        if (res && res.data.success) {
            dispatch(setUser(res.data.data))
            const activeChannel = Cookies.get("active_channel")
            const CHANNEL_PATH = `${process.env.NEXT_PUBLIC_GET_USER_CHANNELS}`
            const channelRes = await apiRequest("get", `${CHANNEL_PATH}?ownerId=${res.data.data.id}`)
            if (channelRes.data.data.length) {
                const firstChannel = channelRes.data.data.data[0];
                dispatch(setActiveChannel(channelRes.data.data));
                if (!activeChannel) {
                    Cookies.set("active_channel", firstChannel.id);
                }
            }
        }
    }

    useEffect(() => {
        getUserInfo()
        const token = getAccessToken();
        if (token !== undefined) {
            dispatch(login(token));
            getUserInfo();
        }
    }, [dispatch]);

    return null
}

export default TokenVerify;