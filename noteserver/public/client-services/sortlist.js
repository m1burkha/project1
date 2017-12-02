/*
* Sort the task list by date, priority, finish date
* */
function sortTaskListWithProperty(list, propertyName, theorder) {

    if (theorder) {
        list.sort((n1, n2) => {

            if (propertyName === 'taskDate') {
                let date1 = dateFormatter(n1.taskDate);
                let date2 = dateFormatter(n2.taskDate);
                return date1 - date2;
            } else {
                return n1[propertyName] - n2[propertyName];
            }
        })
    } else {
        list.sort((n1, n2) => {
            if (propertyName === 'taskDate') {
                let date1 = dateFormatter(n1.taskDate);
                let date2 = dateFormatter(n2.taskDate);
                return date2 - date1;
            } else {
                return n2[propertyName] - n1[propertyName];
            }
        })
    }
}

function sortByFinishDate(list, theorder) {

    let finishedStatusList = list.filter(x => x.status.indexOf('finished') > -1);
    let openStatusList = list.filter(x => x.status.indexOf('open') > -1);
    if(theorder){
        finishedStatusList = finishedStatusList.sort((a, b) =>{
            let date1 = dateFormatter(a.taskDate);
            let date2 = dateFormatter(b.taskDate);
            return date1 - date2;
        })
        openStatusList = openStatusList.sort((a, b) =>{
            let date1 = dateFormatter(a.taskDate);
            let date2 = dateFormatter(b.taskDate);
            return date1 - date2;
        })

    }else{
        finishedStatusList = finishedStatusList.sort((a, b) =>{
            let date1 = dateFormatter(a.taskDate);
            let date2 = dateFormatter(b.taskDate);
            return date2 - date1;
        })
        openStatusList = openStatusList.sort((a, b) =>{
            let date1 = dateFormatter(a.taskDate);
            let date2 = dateFormatter(b.taskDate);
            return date2 - date1;
        })
    }

    return finishedStatusList.concat(openStatusList);
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

function dateFormatter(dateString) {

    return Date.parse(dateString.split('-').reverse().join('-'));
}

export default {showFinish, sortTaskListWithProperty, sortByFinishDate};
