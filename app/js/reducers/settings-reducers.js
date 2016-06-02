import _ from 'lodash';
import {
  UPDATE_SETTINGS,
} from 'actions/settings-actions';

export default function settingsReducers(state = {}, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {...state, settings: action.settings};
    default:
      return state;
  }
}
