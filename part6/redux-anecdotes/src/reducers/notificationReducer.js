import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotificationText(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (text, displaySecs) => {
    return async dispatch => {
        dispatch(setNotificationText(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, displaySecs*1000)
    }
}
export default notificationSlice.reducer