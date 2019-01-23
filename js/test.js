
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
                    saveButton.className = "saveButton";
                    node.append(saveButton);

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







function createNewRowForm() {
    if (rowsCount > 1) {
        //  document.getElementById('id'+(rowsCount-1)).remove('Add'+(rowsCount-1));
    }
    //dohvatanje elementa form block
    var node = document.getElementById("form block");
    //kreiranje novog div elementa u kojem će biti smještene opcije
    var newDiv = document.createElement('div');
    //dodjeljivanje klase kreiranom div elementu
    newDiv.className = "formRow";
    newDiv.id = "row" + rowsCount;

    //kreiranje labele za opciju
    var newLabel = document.createElement('label');
    newLabel.textContent = 'Element ' + rowsCount + ' :';
    newLabel.className = "formLabel " + rowsCount;
    newLabel.id = "lbl " + rowsCount;
    //dodavanje labele div elementu
    newDiv.appendChild(newLabel);
    //kreiranje inputa za labelu
    var newInput = document.createElement('input');
    newInput.placeholder = 'Element 1...';
    newInput.type = "text";
    newInput.id = "inpt" + rowsCount;
    newInput.className = "formInput " + rowsCount;
    //dodavanje inputa kreiranom divu
    newDiv.appendChild(newInput);
    //kreiranje dropdown liste
    var newInputDrop = document.createElement('select');
    newInputDrop.id = "inputType" + rowsCount;
    newInputDrop.className = "type" + rowsCount;
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
    newTypeDrop.className = "typeDrop " + rowsCount;
    newDiv.append(newTypeDrop);
    var newAdd = document.createElement('input');
    newAdd.type = "button";
    newAdd.value = "Add new";
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



function createAdditions(id,selected) {
    console.log(id);
    if(id.charAt(0)==='i')
    {
        createRadio(id);
        createRadioInputCount();
    

    
}
}
function createRadio(id){
    var row=id.charAt(9);
    var newRadioInput = document.createElement('input');
    newRadioInput.type = "text";
    newRadioInput.placeholder = "Radio button 1 label...";
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newRadioInput);
    
}
function createRadioInputCount(id){

}
