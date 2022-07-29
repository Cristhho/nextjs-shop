import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { IUser } from '../../interfaces';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const CART_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, CART_INITIAL_STATE);

  return (
    <AuthContext.Provider value={{
      ...state
    }}>
      {children}
    </AuthContext.Provider>
  );
}
