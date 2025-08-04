import { ChannelListInterface } from "@/lib/interfaces/iontube/channelList.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelState {
    channels: ChannelListInterface | null;
}

const initialState: ChannelState = {
    channels: null
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setActiveChannel: (state, action: PayloadAction<ChannelListInterface>) => {
            state.channels = action.payload
        }
    }
});

export const { setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;