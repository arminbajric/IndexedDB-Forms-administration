
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
                   createNewRowForm()
                   var node = document.getElementById("saveButton");
                   
                   var saveButton=document.createElement('button');
                   saveButton.onclick="saveForm()";
                   saveButton.value="Save";
                   saveButton.textContent="Save";
                   saveButton.className="saveButton";
                   node.append(saveButton);

                }
            }
        }
    }
}
function createNewRowForm() {
    //dohvatanje elementa form block
                    var node = document.getElementById("form block");
                    //kreiranje novog div elementa u kojem će biti smještene opcije
                    var newDiv = document.createElement('div');
                    //dodjeljivanje klase kreiranom div elementu
                    newDiv.className = "formRow";
                    node.append(newDiv);
                    //kreiranje labele za opciju
                    var newLabel = document.createElement('label');
                    newLabel.textContent = 'Element 1 :';
                    newLabel.className = "formLabel"+rowsCount;
                    //dodavanje labele div elementu
                    newDiv.append(newLabel);
                    var newInput = document.createElement('input');
                    newInput.placeholder = 'Element 1...';
                    newInput.type = "text";
                    newInput.id = rowsCount;
                    newInput.className = "formInput"+rowsCount;
                    newDiv.append(newInput);
                    var newDrop = document.createElement('select');
                    var option1 = document.createElement("option");
                    option1.text = "Text Box";
                    newDrop.add(option1);
                    var option2 = document.createElement("option");
                    option2.text = "Check Box";
                    newDrop.add(option2);
                    var option3 = document.createElement("option");
                    option3.text = "Radio Button";
                    newDrop.add(option3);
                    newDrop.className = "formDrop"+rowsCount;
                    newDiv.append(newDrop);
                    var line = document.createElement('hr');
                    newDiv.append(line);
                    rowsCount++;
 }

