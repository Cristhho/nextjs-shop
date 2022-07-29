import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { IUser } from '../../interfaces';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { tesloApi } from '../../api';

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

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({type: '[Auth] - Login', payload: user});
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
