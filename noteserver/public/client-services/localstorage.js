
const appColorStorage = JSON.parse(localStorage.getItem("appcolor") || "[ ]");

class AppStorage {

    retrieveAppColors(storageName){
        return appColorStorage;
    }

    deleteAppColors(){
        localStorage.removeItem("appcolor");
        appColorStorage.length = 0;
    }

    persist(storecolor){
        localStorage.setItem('appcolor', JSON.stringify(storecolor));
    }

    storeAppColors(cssClass) {
        appColorStorage.push(cssClass);
        this.persist(appColorStorage);
    }
}
export default {AppStorage};
