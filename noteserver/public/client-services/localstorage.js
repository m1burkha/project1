
const appColorStorage = JSON.parse(localStorage.getItem("appcolor") || "[ ]");

class AppStorage {

    retrieveAppColors(storageName){
        return JSON.parse(localStorage.getItem('appcolor'));
    }

    persist(storecolor){
        localStorage.setItem('appcolor', JSON.stringify(storecolor));
    }

    storeAppColors(cssClass) {
        appLocalStorage.push(cssClass);
        persist(storageName, appColorStorage);
    }
}
export default {AppStorage};
