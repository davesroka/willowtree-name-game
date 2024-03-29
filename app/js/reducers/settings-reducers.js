import {
  UPDATE_SETTINGS,
} from 'actions/settings-actions';

export default function settingsReducers(state = {}, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...state, ...action.settings };
    default:
      return state;
  }
}
