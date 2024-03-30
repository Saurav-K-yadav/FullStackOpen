import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SHOW":
            return action.payload
        case "DONTSHOW": {
            return ''
        }
        default:
            return state
    }
}

const NotificationContext = createContext()
export const NotificationContextProvider = (props) => {
    const [notify, notifyDispatch] = useReducer(notificationReducer, '')
    
    return (
        <NotificationContext.Provider value={[notify, notifyDispatch]}>
            { props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const notifyAndDispatch = useContext(NotificationContext)
    return notifyAndDispatch[0]

}

export const useNotificationDispatch = () => {
    const notifyAndDispatch = useContext(NotificationContext);
    return notifyAndDispatch[1];
}
export default NotificationContext