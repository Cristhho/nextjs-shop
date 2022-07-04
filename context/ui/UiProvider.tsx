import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext } from './UiContext';
import { uiReducer } from './uiReducer';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: 'UI - Toggle Menu' });
  }

  return (
    <UiContext.Provider value={{
      ...state,
      toggleSideMenu
    }}>
      {children}
    </UiContext.Provider>
  );
}
