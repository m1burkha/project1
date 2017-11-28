
const appColorStorage = JSON.parse(localStorage.getItem("appcolor") || "[ ]");

class AppStorage {

    static retrieveAppColors(){
        if(appColorStorage.length === 0){
            document.querySelector('body').classList.remove("bodyColor");
        }else{
            document.querySelector('body').classList.add("bodyColor");
        }
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
