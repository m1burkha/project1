/*
* Sort the task list by date, priority, finish date
* */
function sortTaskListWithProperty(list, propertyName, theorder) {

    if (theorder) {
        list.sort((n1, n2) => {

            if (propertyName === 'taskDate') {
                let date1 = Date.parse(n1.taskDate.split('-').reverse().join('-'));
                let date2 = Date.parse(n2.taskDate.split('-').reverse().join('-'));
                return date1 - date2;
            }
            else if (propertyName === 'finished') {
                if(n1.status === "finished" && n2.status === "finished") {
                    return n1.taskDate - n2.taskDate
                }

            } else {
                return n1[propertyName] - n2[propertyName];
            }
        })
    } else {
        list.sort((n1, n2) => {
            if (propertyName === 'taskDate') {
                let date1 = Date.parse(n1.taskDate.split('-').reverse().join('-'));
                let date2 = Date.parse(n2.taskDate.split('-').reverse().join('-'));
                return date2 - date1;

            } else if (propertyName === 'finished') {
                if(n1.status === "finished" && n2.status === "finished"){
                   return n2.taskDate - n1.taskDate;
                }
            } else {
                return n2[propertyName] - n1[propertyName];
            }
        })
    }
}


/*The showFinish methos filters and displays only the finished items
* @filterlist , the list to be filtered
* @theorder, the order of the list asc or desc
* @ returns the new filtered list
* */
function showFinish(filterlist, theorder) {

    if (theorder) {

        filterlist = filterlist.sort((n1, n2) => {

            let date1 = Date.parse(n1.taskDate.split('-').reverse().join('-'));
            let date2 = Date.parse(n2.taskDate.split('-').reverse().join('-'));
            return date1 - date2;
        })
            .filter((item) => {
                return item.status === 'finished'
            });
        return filterlist;


    } else {
        filterlist = filterlist.sort((n1, n2) => {

            let date1 = Date.parse(n1.taskDate.split('-').reverse().join('-'));
            let date2 = Date.parse(n2.taskDate.split('-').reverse().join('-'));
            return date2 - date1;
        })
            .filter((item) => {
                return item.status === 'finished'
            });
        return filterlist;
    }
}

export default {showFinish, sortTaskListWithProperty};
