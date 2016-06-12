export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const SETTINGS_MODEL = {
  numberOfChoices: 5,
};

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
