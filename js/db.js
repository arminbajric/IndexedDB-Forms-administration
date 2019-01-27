
function checkDB() {
    var request = window.indexedDB.open('formsAdministrationDB', 1);

    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        console.log('upgradeeeeeeee')
        var list = db.objectStoreNames;

        if (!list.contains('administratorTemplate')) {
            var store = db.createObjectStore('administratorTemplate', { autoIncrement: true });

            console.log("Store created")
        }
        if (!list.contains('formularData')) {
            var store = db.createObjectStore('formularData', { autoIncrement: true });

            console.log("Store created")
        }
        if (!list.contains('formularTemplate')) {
            var store = db.createObjectStore('formularTemplate', { autoIncrement: true });

            console.log("Store created")
        }

    };
  
    request.onerror = function (event) {
        console.log('[onerror]', request.error);
    };
}





function addTemplateToDB(data, key, objectStore) {
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data1;
    var formhtml;
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("administratorTemplate", 'readwrite');
        var store = tx.objectStore("administratorTemplate");
        data1 = store.get(key );
        data1.onsuccess = function (event) {
           
            store.put(data, key );
            console.log('insert doneeeeeee')
        }




    };

}


function searchforTemplate(key) {
   
     var state;
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    
    request.onsuccess = function (event) {
         db = request.result;
         var tx = db.transaction("administratorTemplate", 'readwrite');
    var store = tx.objectStore("administratorTemplate");
    var data = store.get(  key );
    data.onsuccess=function (event){
        if(data.result)
        {
        showFoundedTemplate(data.result);   
    
    state=true;
}
    }
    
    }
    
    
 
 
    return state;

}

function addFormularTemplateToDB(data,key)
{
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data1;
   
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularTemplate", 'readwrite');
        var store = tx.objectStore("formularTemplate");
        data1 = store.get(key );
        data1.onsuccess = function (event) {
           
            store.put(data, key );
            console.log('insert doneeeeeee')
        }




    };
}
function updateFormularList()
{
    //this will make list empty and will add default option
    var node = document.getElementById('formList');
    node.innerHTML = "";
    var defaultOption = document.createElement('option');
    defaultOption.textContent = "Select formular";
    node.appendChild(defaultOption);

//this block will get all temlate names from database and in loop they will be added to formular list as options
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var keys;
    var res={};
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularTemplate", 'readwrite');
        var store = tx.objectStore("formularTemplate");
        keys = store.getAllKeys();
        keys.onsuccess = function (event) {
           
            res=keys.result;
            for (var i = 0; i <res.length; i++) {
                var newOption = document.createElement('option');
            
                newOption.text = res[i];
                newOption.id = 'option' + (i + 1);
                node.appendChild(newOption);
                console.log('list updated');
            }
            
        }
   
    
}


document.getElementById('formList').setAttribute("onchange", 'loadTemplate()')
}
function loadTemplate()
{
    var query=document.getElementById('formList').value;
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data;
   
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularTemplate", 'readwrite');
        var store = tx.objectStore("formularTemplate");
       data = store.get(query);
        data.onsuccess = function (event) {
        document.getElementById('formularContent').innerHTML=data.result;   
           
            
        }
}
}