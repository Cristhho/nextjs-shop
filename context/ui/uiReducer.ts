import { UiState } from './UiProvider';

type UIActionType =
|{ type: 'UI - Toggle Menu' }

export const uiReducer = (state: UiState, action: UIActionType): UiState => {
  switch (action.type) {
    case 'UI - Toggle Menu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }
    default:
      return state;
  }
}
