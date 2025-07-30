'use client'

import { apiRequest } from "@/helper/api.helper";
import { UserInterface } from "@/lib/interfaces/user.interface";
import { login, setUser } from "@/lib/redux/slices/auth.slice";
import { RootState } from "@/lib/redux/Store";
import { getAccessToken } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TokenVerify = () => {
    const dispatch = useDispatch();
    const getUserInfo = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_GET_USER_INFO_API}`
        const res = await apiRequest("get", PATH)
        if (res.data.success) {
            dispatch(setUser(res.data.data))
        }
    }
    useEffect(() => {
        getUserInfo()
        const token = getAccessToken();
        if (token) {
            dispatch(login(token));
            getUserInfo();
        }
    }, [dispatch]);

    return null
}

export default TokenVerify;