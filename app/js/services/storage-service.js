export default class StorageService{
  export Storage.prototype.setObject = (key, value) => {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = (key) {
  return JSON.parse(this.getItem(key));
}
}

