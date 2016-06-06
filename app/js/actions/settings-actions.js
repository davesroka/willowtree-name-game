/*
 * Action Types
 */
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

/*
* Other Constants
* */
export const SETTINGS_MODEL = {
  numberOfChoices: 5,

};

/*
 * Action Creators
 */
export function updateSettings(settings) {
  if (settings) {
    localStorage.settings = settings;
  } else {
    settings = localStorage.settings || SETTINGS_MODEL;
  }
  return {
    type: UPDATE_SETTINGS,
    settings,
  };
}

export function saveSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    settings,
  };
}
