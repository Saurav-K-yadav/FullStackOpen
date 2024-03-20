
const notificationReducer = (state = null, action)=>{
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            {
            console.log(`CALLED ${action.payload}`);
                return action.payload
            }
        case 'CLEAR_NOTIFICATION':
            return null;
        
        default:
            return state
    }
}

export const createNotification = (notification) => {
    
    return {
        type: 'NEW_NOTIFICATION',
        payload:notification
        
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    };
};


export default notificationReducer; 