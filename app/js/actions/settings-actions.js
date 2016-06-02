
/*
 * Action Types
 */

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

/*
* Other Constants
* */

export const SETTINGS_MODEL = {
  numberOfChoices : 5,

};
/*
 * Action Creators
 */

export function updateSettings() {

  return {
    type: UPDATE_SETTINGS,
    settings,
  };
}

function saveSettings(settings) {
  if (settings){
    localStorage.settings = settings;
  }
  else{
    const settings = localStorage.settings || SETTINGS_MODEL;
  }

  return {
    type: UPDATE_SETTINGS,
    settings,
  };
}
