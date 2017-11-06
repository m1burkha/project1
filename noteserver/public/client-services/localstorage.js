
const appLocalStorage = JSON.parse(localStorage.getItem("notelist") || "[ ]");

function retrieveAppColors(storageName){
    return JSON.parse(localStorage.getItem(storageName));
}

function persist(storageName, tostorage){
    localStorage.setItem(storageName, JSON.stringify(tostorage));
}

function storeAppColors(storageName,cssClass) {
    appLocalStorage.push(cssClass);
    persist(storageName, appLocalStorage);
}

export default {storeAppColors,retrieveAppColors};
