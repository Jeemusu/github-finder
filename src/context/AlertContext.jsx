import { createContext, useReducer, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  /** Create initial state */
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        message,
        type,
      },
    });

    setTimeout(
      () => dispatch({
        type: 'REMOVE_ALERT',
      }),
      3000
    );
  };

  const value = useMemo(() => ({
    setAlert,
    alert: state,
  }), [
    state,
  ]);

  return (
    <AlertContext.Provider
      value={value}
    >
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContext;
