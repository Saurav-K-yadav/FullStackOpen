
const filter = (state = '', action) => { 
    switch (action.type) {
        case 'FIND':
            { 
                return action.payload
            }
        default:
            return state
    }
}

export const filterchange = (value) => {
    return {
        type: 'FIND',
        payload: {
            pattern:value
        }
        
    }
}
export default filter