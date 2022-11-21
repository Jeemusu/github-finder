import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext() 

export const AlertProvider = ({children}) => {

    /** Create initial state */
    const initialState = null

    const [state, dispatch] = useReducer(alertReducer, initialState)

    const setAlert = (message, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {
                message,
                type
            }
        })

        setTimeout(() => dispatch({
            type: 'REMOVE_ALERT',
        }), 3000)
    }

    return (
        <AlertContext.Provider
            value={{ 
                setAlert: setAlert,
                alert: state 
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext