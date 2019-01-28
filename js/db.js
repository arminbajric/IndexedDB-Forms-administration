
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
        data1 = store.get(key);
        data1.onsuccess = function (event) {

            store.put(data, key);
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
        var data = store.get(key);
        data.onsuccess = function (event) {
            if (data.result) {
                showFoundedTemplate(data.result);

                state = true;
            }
        }

    }




    return state;

}

function addFormularTemplateToDB(data, key) {
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data1;

    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularTemplate", 'readwrite');
        var store = tx.objectStore("formularTemplate");
        data1 = store.get(key);
        data1.onsuccess = function (event) {

            store.put(data, key);

        }




    };
}
function updateFormularList() {
    //this will make list empty and will add default option
    var node = document.getElementById('formList');
    node.innerHTML = "";
    var defaultOption = document.createElement('option');
    defaultOption.textContent = "Select formular";
    node.appendChild(defaultOption);

    //this block will get all temlate names from database and in loop they will be added to formular list as options
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var keys;
    var res = {};
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularTemplate", 'readwrite');
        var store = tx.objectStore("formularTemplate");
        keys = store.getAllKeys();
        keys.onsuccess = function (event) {

            res = keys.result;
            for (var i = 0; i < res.length; i++) {

                var newOption = document.createElement('option');

                newOption.text = res[i];
                newOption.id = 'option' + (i + 1);
                node.appendChild(newOption);
                console.log('list updated');
            }

        }


    }


    document.getElementById('formList').setAttribute("onchange", 'getVersions()')
}


//this function will get formular template and show it on formular tab
//there is no need to check if formular exist because list is updating  on enough  events and all  listed formulars are in datbase
function loadTemplate(query) {

    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data;

    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularData", 'readwrite');
        var store = tx.objectStore("formularData");
        data = store.get(query);
        data.onsuccess = function (event) {
            document.getElementById('formularContent').innerHTML = data.result;
            var node = document.getElementById('saveButtonContentFormular');
            var newSave = document.createElement('button');
            newSave.textContent = "Save data";
            newSave.id = "saveData";
            newSave.setAttribute('onclick', "saveFormularData()");
            node.appendChild(newSave);
            var newVersion = document.createElement('input');
            newVersion.type = "text";
            newVersion.placeholder = "Add custom version...";
            newVersion.id = "versionInput";
            newVersion.setAttribute('onchange', 'checkInput(this.id);')
            node.appendChild(newVersion);
        }
    }

}

function saveFormularData() {
    var key = document.getElementById('formList').value;
    //version can be setted by user or it will be generated with math random method
    var version = document.getElementById('versionInput').value;
    if (version == "") {
        if (document.getElementById('selectVersion').value == "" || document.getElementById('selectVersion').value == "Select formular first") {
            version = 'ver1.00'
        }
        else {
            version = 'ver' + Math.random().toString(36).substring(2, 5);;
        }
    }
    //selection will check if formular requirements are meet and if they are it will proceed with saving
    if (validateFormularData()) {
        var data = document.getElementById('formularContent').innerHTML;
        var request = window.indexedDB.open('formsAdministrationDB', 1);
        //if
        request.onsuccess = function (event) {
            var db = event.target.result;

            var tx = db.transaction('formularData', 'readwrite');
            var store = tx.objectStore('formularData');
            store.add(data, key + "%" + version);
            document.getElementById('formularContent').innerHTML = "";
            document.getElementById('saveButtonContentFormular').innerHTML = "";
            getVersions();
        };
    }
    else {
        alert('Error while saving.Check if inserted data meets input requirements!')
    }
}

function checkForVersionCollision(objStore, inputVersion) {

    var request = window.indexedDB.open('formsAdministrationDB', 1);
    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction(objStore, 'readwrite');
        var store = tx.objectStore(objStore);
        var data = store.get(inputVersion);
        data.onerror = function () {
            return false;
        }
    }

}

function getVersions() {
    var selected = document.getElementById('formList').value;
    if (selected != "Select formular") {
        var request = window.indexedDB.open('formsAdministrationDB', 1);

        var versionsExist;
        request.onsuccess = function (event) {
            var db = event.target.result;
            var tx = db.transaction("formularData", 'readwrite');
            var store = tx.objectStore("formularData");
            var data = store.getAllKeys();
            data.onsuccess = function () {
                var keys = (data.result);
                console.log(keys);
                document.getElementById('selectVersion').innerHTML = "";
                var def = document.createElement('option');
                def.textContent = "Select version";
                document.getElementById('selectVersion').appendChild(def);
                document.getElementById('formularContent').innerHTML = "";
                document.getElementById('saveButtonContentFormular').innerHTML = ""
                for (var i = 0; i < keys.length; i++) {
                    var name;
                    name = keys[i];
                    //selection will check if key matches selected formular and key pattern
                    if (name.search(selected) > -1 && name.charAt(selected.length) == "%") {
                        var split = name.search('%');
                        if (split > -1) {
                            var ver = name.substr(split + 1);
                            console.log(ver + "   aaaaaaaa");
                            versionsExist = true;


                            var opt = document.createElement('option')
                            opt.textContent = ver;

                            document.getElementById('selectVersion').appendChild(opt);
                            document.getElementById('selectVersion').setAttribute('onchange', "loadVersion()")
                        }
                    }
                }
                //if there is no versions record empty template will be loaded
                if (!versionsExist) {
                    loadTemplate(selected);

                    var opt = document.createElement('option')
                    opt.textContent = 'No versions';
                    document.getElementById('selectVersion').innerHTML = "";
                    document.getElementById('selectVersion').appendChild(opt);

                }

            }
        }
    }
    else {
        document.getElementById('formularContent').innerHTML = "";
        document.getElementById('selectVersion').innerHTML = "";
        var option = document.createElement('option');
        option.textContent = "Select formular first";
        document.getElementById('selectVersion').appendChild(option);
        document.getElementById('formularContent').innerHTML = "";
        document.getElementById('saveButtonContentFormular').innerHTML = "";
    }
}
function addToFormularData(data, key) {
    var request = window.indexedDB.open('formsAdministrationDB', 1);
    var data1;

    request.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction("formularData", 'readwrite');
        var store = tx.objectStore("formularData");
        data1 = store.add(data, key);
        data1.onsuccess = function (event) {


            console.log('insert doneeeeeee')
        }




    };
}


function loadVersion() {
    if (document.getElementById('selectVersion').value != "Select version") {
        var version = document.getElementById('formList').value + "%" + document.getElementById('selectVersion').value;
        console.log(version);
        var request = window.indexedDB.open('formsAdministrationDB', 1);
        var data1;

        request.onsuccess = function (event) {
            var db = event.target.result;
            var tx = db.transaction("formularData", 'readwrite');
            var store = tx.objectStore("formularData");
            data1 = store.get(version);
            data1.onsuccess = function (event) {
                document.getElementById('formularContent').innerHTML = data1.result;

                console.log('load done')
            }




        };
        var node = document.getElementById('saveButtonContentFormular');
        node.innerHTML = "";
        var newSave = document.createElement('button');
        newSave.textContent = "Save data";
        newSave.id = "saveData";
        newSave.setAttribute('onclick', "saveFormularData()");
        node.appendChild(newSave);
        var newVersion = document.createElement('input');
        newVersion.type = "text";
        newVersion.placeholder = "Add custom version...";
        newVersion.id = "versionInput";
        newVersion.setAttribute('oninput', 'checkInput(this.id);')
        node.appendChild(newVersion);
    }
    else {
        document.getElementById('formularContent').innerHTML = "";
        document.getElementById('saveButtonContentFormular').innerHTML = "";
    }
}