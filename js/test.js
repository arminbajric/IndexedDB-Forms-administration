
var rowsCount = 1;
function openTab(evt, tabName) {

    var i, tabcontent, tablinks;
    console.log('clicked');
    //skrivanje svih blokova koji imaju klasu tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // deaktiviranje tabova
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //prikazivanje odabranog taba i aktiviranje odabranog taba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//funkcija koja se izvršava pri učitavanju stranice te prikazuje Administrator tab te inicira bazu u koju će se smještati podaci
function init() {
    //prikazivanje administrator taba tokom učitavanja stranice
    document.getElementById("Administrator").style.display = "block";
    //provjera da li browser podržava indexedDb
    if (checkSupportDB()) {

        var openRequest = indexedDB.open("testFormular", 1);
        //kreiranje baze ako već ne postoji
        openRequest.onupgradeneeded = function (e) {
            var thisDB = e.target.result;

            if (!thisDB.objectStoreNames.contains('Formular', { key: "formTitle" })) {
                thisDB.createObjectStore('Formular', { key: "formTitle" });
            }


        }
        //u slučaju greške ispis poruke
        openRequest.onerror = function (e) {
            console.log("Error!!!!");
        }
        //ukoliko je sve uspješno odrađeno ispis poruke Success
        openRequest.onsuccess = function () {
            console.log("Success!!");
        }
        console.log(openRequest);
    }
}
//funkcija koja provjera da li browser podržava IndexedDB
function checkSupportDB() {
    if (typeof window.indexedDB != 'undefined') {


        return true;
    }
    return false;
}
//metoda koja pretražuje  već snimljenje formulare u bazi
function searchForFormular(value) {
    //dohvatanje vrijednosti upisane u pretragu
    var search = document.getElementById("search");
    //provjera da li browser podržava indexedDB
    if (checkSupportDB) {
        //otvaranje baze
        var openRequest = window.indexedDB.open('testFormular', 1);
        //ukoliko je uspješno otvorena baza izvršava se naredna metoda koja pretražuje bazu i upoređuje zapise sa traženim 
        openRequest.onsuccess = () => {
            //dohvatanje zapisa iz baze
            const db = openRequest.result;
            const transaction = db.transaction(['Formular'], 'readonly');
            //dohvatanje željenog objekta 
            const getStore = transaction.objectStore('Formular');
            //postavljanje kursora za pretragu baze
            const getCursorRequest = getStore.openCursor();
            //u slučaju da je kursor uspješno postavljen  kreće pretraživanje baze
            getCursorRequest.onsuccess = e => {
                const cursor = e.target.result;
                cursor

                //poređenje kursora i vrijednosti iz unosa
                if (cursor === search.value) {
                    console.log(cursor.value);
                    //pomjeranje kursora i ponovno provjeravanje podudaranja
                    cursor.continue();
                } else {
                    createNewRowForm();
                    var node = document.getElementById("saveButton");

                    var saveButton = document.createElement('button');
                    saveButton.onclick = "saveForm()";
                    saveButton.value = "Save";
                    saveButton.textContent = "Save";
                    saveButton.id = "saveForm";
                    saveButton.className = "saveButton";
                    node.append(saveButton);
                    document.getElementById('saveForm').setAttribute("onclick", 'saveForm()');
                }
            }
        }
    }
}
var newAdd = document.createElement('input');
newAdd.type = "button";
newAdd.textContent = "Add new";
newAdd.id = "Add" + rowsCount;
newAdd.onclick = "createNewRowForm()";






//function which will create one row in form when it is called
function createNewRowForm() {
    var element = document.getElementById('Add' + (rowsCount - 1));
    if (element) {
        element.remove();
    }
    //getting the form wrapper where all elements will be added
    var node = document.getElementById("form block");
    //creating new div element which will be one row in form
    var newDiv = document.createElement('div');
    //assigning id and class to div element
    newDiv.className = "formRow";
    newDiv.id = "row" + rowsCount;

    //creating label for input label
    var newLabel = document.createElement('label');
    newLabel.textContent = 'Element ' + rowsCount + ' :';
    newLabel.className = "leftMarginForm";
    newLabel.id = "lbl " + rowsCount;
    //adding label to div element,label have id and class assigned
    newDiv.appendChild(newLabel);
    //creating text input for label which was created above
    var newInput = document.createElement('input');
    newInput.placeholder = 'Element ' + rowsCount + '...';
    newInput.type = "text";
    newInput.id = "inpt" + rowsCount;
    newInput.className = "leftMarginForm";
    //adding created text input to div element
    newDiv.appendChild(newInput);
    //kreiranje dropdown liste
    var newInputDrop = document.createElement('select');
    newInputDrop.id = "inputType" + rowsCount;
    newInputDrop.className = "leftMarginForm";
    var option1 = document.createElement('option');
    //kreiranje opcija liste
    option1.text = "Text Box";
    //dodavanje opcija listi
    newInputDrop.add(option1);
    var option2 = document.createElement("option");
    option2.text = "Check Box";
    newInputDrop.add(option2);
    var option3 = document.createElement("option");
    option3.text = "Radio Button";
    option3.id = "opt" + rowsCount;


    newInputDrop.add(option3);
    newInputDrop.className = "formDrop " + rowsCount;
    //dodavanje liste prethodno kreiranom div elementu
    newDiv.appendChild(newInputDrop);
    var newTypeDrop = document.createElement('select');
    newTypeDrop.id = "type" + rowsCount;
    var opt1 = document.createElement('option');
    //kreiranje opcija liste
    opt1.text = "None";
    //dodavanje opcija listi
    newTypeDrop.add(opt1);
    var opt2 = document.createElement("option");
    opt2.text = "Mandatory";
    newTypeDrop.add(opt2);
    var opt3 = document.createElement("option");
    opt3.text = "Numeric";
    newTypeDrop.add(opt3);
    newTypeDrop.id = "typeDrop " + rowsCount;
    newTypeDrop.className = "leftMarginForm";
    newDiv.append(newTypeDrop);
    var newAdd = document.createElement('input');
    newAdd.type = "button";
    newAdd.value = "Add new";
    newAdd.className = "leftMarginForm";
    newAdd.id = "Add" + rowsCount;
    newAdd.onclick = createNewRowForm;

    newDiv.append(newAdd);
    //kreiranje i dodavanje horizontalne linije

    //povećavanje varijable zbog identificiranja redova formulara
    rowsCount++;
    console.log(rowsCount);
    node.appendChild(newDiv);
    document.getElementById("inputType" + (rowsCount - 1)).setAttribute("onchange", "createAdditions(this.id,this.value);");
}



function createAdditions(id, selected) {
    console.log(id + selected);
    var row = id.charAt(9);
    if (id.charAt(0) === 'i' && selected == 'Radio Button') {
        var element = document.getElementById('checkCoun' + id.charAt(9));
        if (element) {
            element.remove();
        }
        removeCheckInputs(id.charAt(9));
        createRadioInputCount(id);
    }
    else if (id.charAt(0) === 'i' && selected == 'Check Box') {
        var element = document.getElementById('radioCoun' + id.charAt(9));
        if (element) {
            element.remove();
        }
        removeRadioInputs(id.charAt(9));
        createCheckBoxInputCount(id);
    }
    else if (id.charAt(0) === 'i' && selected == 'Text Box') {
        removeRadioInputs(id.charAt(9));
        removeCheckInputs(id.charAt(9));
        var element = document.getElementById('checkCoun' + id.charAt(9));
        if (element) {
            element.remove();
        }
        var element1 = document.getElementById('radioCoun' + id.charAt(9));
        if (element1) {
            element1.remove();
        }
    }
}
function createRadio(id, value) {

    //this will return the row where radio count is called
    var row = id.charAt(9);
    console.log(row);
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        var element1 = document.getElementById('count' + row + " " + 1);
        console.log(typeof (element));
        if (element1) {

            element1.remove()

        }
        var element2 = document.getElementById('count' + row + " " + 2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('count' + row + " " + 3);
        if (element3) {

            element3.remove();
        }
    }
    //this block will remove  radios 2 and 3 an radio 2 will be added at the end of the function
    if (value === '2') {
        var element2 = document.getElementById('count' + row + " " + 2);
        console.log(element2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('count' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }
    //if the user reselect option 3 this block will remove third radio and the same will be added at the end of function
    if (value === '3') {
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('count' + row + " " + 2);
        if (!element2) {
            var newRadioInput = document.createElement('input');
            newRadioInput.type = "text";
            newRadioInput.id = "count" + row + " " + (value - 1);
            newRadioInput.placeholder = "Radio button " + (value - 1) + " label...";
            var existingDiv = document.getElementById("row" + row);
            existingDiv.appendChild(newRadioInput);
        }
        var element3 = document.getElementById('count' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }
    //block which will add one radio input label
    var newRadioInput = document.createElement('input');
    newRadioInput.type = "text";
    newRadioInput.id = "count" + row + " " + value;
    newRadioInput.placeholder = "Radio button " + value + " label...";
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newRadioInput);

}
//function which will create dropbox with options 
function createRadioInputCount(id) {

    var row = id.charAt(9);
    var existingDiv = document.getElementById('row' + row);
    var newRadioCountInput = document.createElement('select');
    newRadioCountInput.id = "radioCoun" + row;
    var option1 = document.createElement('option');
    option1.text = "1"
    newRadioCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2"
    newRadioCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    newRadioCountInput.add(option3);
    newRadioCountInput.className = "leftMarginForm";
    var typeDrop = document.getElementById('row' + row)
    existingDiv.insertBefore(newRadioCountInput, typeDrop.childNodes[3]);
    document.getElementById("radioCoun" + row).setAttribute("onchange", "createRadio(this.id,this.value);");

    createRadio(id, 1);
}
function createCheckBoxInputCount(id) {

    var row = id.charAt(9);
    var existingDiv = document.getElementById('row' + row);
    var newCheckCountInput = document.createElement('select');
    newCheckCountInput.id = "checkCoun" + row;
    var option1 = document.createElement('option');
    option1.text = "1"
    newCheckCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2"
    newCheckCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    newCheckCountInput.add(option3);
    newCheckCountInput.className = "leftMarginForm";
    var typeDrop = document.getElementById('row' + row)
    existingDiv.insertBefore(newCheckCountInput, typeDrop.childNodes[3]);
    document.getElementById("checkCoun" + row).setAttribute("onchange", "createCheckBox(this.id,this.value);");

    createCheckBox(id, 1);
}
function createRadio(id, value) {

    //this will return the row where radio count is called
    var row = id.charAt(9);
    console.log(row);
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        var element1 = document.getElementById('countRadio' + row + " " + 1);
        console.log(typeof (element));
        if (element1) {

            element1.remove()

        }
        var element2 = document.getElementById('countRadio' + row + " " + 2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('countRadio' + row + " " + 3);
        if (element3) {

            element3.remove();
        }
    }
    //this block will remove  radios 2 and 3 an radio 2 will be added at the end of the function
    if (value === '2') {
        var element2 = document.getElementById('countRadio' + row + " " + 2);
        console.log(element2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('countRadio' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }
    //if the user reselects option 3 this block will remove third radio and the same will be added at the end of function
    if (value === '3') {
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('count' + row + " " + 2);
        if (!element2) {
            var newRadioInput = document.createElement('input');
            newRadioInput.type = "text";
            newRadioInput.id = "countRadio" + row + " " + (value - 1);
            newRadioInput.placeholder = "Radio button " + (value - 1) + " label...";
            newRadioInput.style.display = "block"
            var existingDiv = document.getElementById("row" + row);
            existingDiv.appendChild(newRadioInput);
        }
        var element3 = document.getElementById('count' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }

    var newRadioInput = document.createElement('input');
    newRadioInput.type = "text";
    newRadioInput.id = "countRadio" + row + " " + value;
    newRadioInput.placeholder = "Radio button " + value + " label...";
    newRadioInput.style.display = "block"
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newRadioInput);

}
function createCheckBox(id, value) {

    //this will return the row where radio count is called
    var row = id.charAt(9);
    console.log(row);
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        var element1 = document.getElementById('countCheck' + row + " " + 1);
        console.log(typeof (element));
        if (element1) {

            element1.remove()

        }
        var element2 = document.getElementById('countCheck' + row + " " + 2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('countCheck' + row + " " + 3);
        if (element3) {

            element3.remove();
        }
    }
    //this block will remove  radios 2 and 3 an radio 2 will be added at the end of the function
    if (value === '2') {
        var element2 = document.getElementById('countCheck' + row + " " + 2);
        console.log(element2);
        if (element2) {

            element2.remove();

        }
        var element3 = document.getElementById('countCheck' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }
    //if the user reselect option 3 this block will remove third radio and the same will be added at the end of function
    if (value === '3') {
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('countCheck' + row + " " + 2);
        if (!element2) {
            var newCheckInput = document.createElement('input');
            newCheckInput.type = "text";
            newCheckInput.id = "countCheck" + row + " " + (value - 1);
            newCheckInput.placeholder = "Check box " + (value - 1) + " label...";
            newCheckInput.style.display = "block";
            var existingDiv = document.getElementById("row" + row);

            existingDiv.appendChild(newCheckInput);
        }
        var element3 = document.getElementById('count' + row + " " + 3);
        if (element3) {

            element3.remove();

        }
    }

    var newCheckInput = document.createElement('input');
    newCheckInput.type = "text";
    newCheckInput.id = "countCheck" + row + " " + value;
    newCheckInput.placeholder = "Check box " + value + " label...";
    newCheckInput.style.display = "block";
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newCheckInput);

}
function removeRadioInputs(row) {
    var element1 = document.getElementById('countRadio' + row + " " + 1);
    console.log(typeof (element));
    if (element1) {

        element1.remove()

    }
    var element2 = document.getElementById('countRadio' + row + " " + 2);
    if (element2) {

        element2.remove();

    }
    var element3 = document.getElementById('countRadio' + row + " " + 3);
    if (element3) {

        element3.remove();
    }
}
function removeCheckInputs(row) {
    var element1 = document.getElementById('countCheck' + row + " " + 1);
    console.log(typeof (element));
    if (element1) {

        element1.remove()

    }
    var element2 = document.getElementById('countCheck' + row + " " + 2);
    if (element2) {

        element2.remove();

    }
    var element3 = document.getElementById('countCheck' + row + " " + 3);
    if (element3) {

        element3.remove();
    }
}

function saveForm() {
    var numberOdRows = rowsCount - 1;
    var formName = document.getElementById('search');
    for (var i = 0; i < numberOdRows; i++) {
        var rowLabel = document.getElementById('inpt' + (i + 1));
        var rowTextBox = document.getElementById('formDrop ' + (i + 1));
        if(rowTextBox)
        {
        if (rowTextBox.nodeValue == "Text Box") {
            rowTextBox = "text";
        }
        }
        else {
            rowTextBox = "";
        }
        var rowRadio1Label = document.getElementById('countRadio' + (i + 1) + " " + 1);
        var rowRadio2Label = document.getElementById('countRadio' + (i + 1) + " " + 2);
        var rowRadio3Label = document.getElementById('countRadio' + (i + 1) + " " + 3);
        var rowCheck1Label = document.getElementById('countCheck' + (i + 1) + " " + 1);
        var rowCheck2Label = document.getElementById('countCheck' + (i + 1) + " " + 2);
        var rowCheck3Label = document.getElementById('countCheck' + (i + 1) + " " + 3);
        var inputType = document.getElementById('typeDrop ' + (i + 1));
        var formRow = new rowFormularTemplate(rowLabel.value, rowTextBox, rowRadio1Label.value, rowRadio2Label.value, rowRadio3Label.value, rowCheck1Label.value, rowCheck2Label.value, rowCheck3Label.value, inputType.value);
        if (checkSupportDB) {
         
            var openRequest = window.indexedDB.open('testFormular', 1);
           
                const db = openRequest.result;
                const transaction = db.transaction(['Formular'], 'readwrite').objectStore('Formular').add({formtitle:formName,row:formRow});
                openRequest.onsuccess = () => {
                    console.log("Uspješno dodano!!!!!!!")

            }
            openRequest.onerror=()=>{
                console.log("Sranjeeeee")
            }
        }
    }
}