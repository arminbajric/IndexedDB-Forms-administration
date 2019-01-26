
function checkDB() {
    var request = window.indexedDB.open('formsTemplateDB', 1);

    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        console.log('upgradeeeeeeee')
        var list = db.objectStoreNames;

        if (!list.contains('formsTemplate')) {
            var store = db.createObjectStore('formsTemplate', { autoIncrement: true });

            console.log("Store created")
        }
        if (!list.contains('formsData')) {
            var store = db.createObjectStore('formsData', { autoIncrement: true });

            console.log("Store created")
        }

    };
    request.onsuccess = function (event) {


    };
    request.onerror = function (event) {
        console.log('[onerror]', request.error);
    };
}





function addTemplateToDB(data, key, objectStore) {
    var request = window.indexedDB.open('formsTemplateDB', 1);
    var data1;
    var formhtml;
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formsTemplate", 'readwrite');
        var store = tx.objectStore("formsTemplate");
        data1 = store.add(data, "\"" + key + "\"");
        data1.onsuccess = function (event) {
            console.log('doneeeeeeeeeeeeeeeee');
        }




    };

}

var htmlData;
function searchforTemplate(key) {
   
     var state;
    var request = window.indexedDB.open('formsTemplateDB', 1);
    
    request.onsuccess = function (event) {
         db = request.result;
         var tx = db.transaction("formsTemplate", 'readwrite');
    var store = tx.objectStore("formsTemplate");
    var data = store.get("\"" + key + "\"");
    data.onsuccess=function (event){
        if(data.result)
        {
        showFoundedTemplate(data.result);   
    console.log('successsssssssssssssss')
    state=1;
}
    }
    
    }
    
    
 
 
    return state;

}
