
var rowsCount = 1;
function openTab(evt, tabName) {

    var i, tabcontent, tablinks;
    console.log('clicked');
    //hiding all block with class tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    updateFormular();
    // deactivating tabs
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //activate and show selected tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//function which loads on page loading event and activates administrator tab
function init() {
    //on initialization of page first it will check if indexedDB is suported ,and if so page will load,and otherwise it will display error

    if (window.indexedDB) {
        checkDB();
        document.getElementById("Administrator").style.display = "block";
        updateFormular();
    }
    else {
        document.getElementById('mainContainer').innerHTML = "<h2>Error!IndexedDB is not supported<br>Try other browser!</h2>";
    }

}








//function which will search for wanted formular template and will offer creating new template if wanted is not founded
function searchForFormular() {
    //block which will reset form block for new search
    var node = document.getElementById('form block');
    if (node) {
        node.innerHTML = "";
    }
    var save = document.getElementById("saveButton");
    if (save) {
        save.innerHTML = "";
    }

    //block will check if wanted formular is in store and will call to load template if it does
    var htmlData = searchforTemplate(document.getElementById('search').value);
    console.log(htmlData);
    if (htmlData) {
        showFoundedTemplate(htmlData);
        var node = document.getElementById("saveButton");

        var saveButton = document.createElement('button');
        saveButton.value = "Save";
        saveButton.textContent = "Save";
        saveButton.id = "saveForm";
        saveButton.className = "saveButton";
        node.append(saveButton);
        document.getElementById('saveForm').setAttribute("onclick", 'saveForm()');
        htmlData = "";
        rowsCount = document.getElementById('form block').childElementCount;
    }




    else {
        rowsCount = 1;
        //this block will be activated if wanted formular is not found and it will add first row of new formular which will be saved as search query
        //creating first row
        createNewRowForm();
        //displaying and setting save button for new form
        var node = document.getElementById("saveButton");

        var saveButton = document.createElement('button');

        saveButton.value = "Save";
        saveButton.textContent = "Save";
        saveButton.id = "saveForm";
        saveButton.className = "saveButton";
        node.append(saveButton);
        document.getElementById('saveForm').setAttribute("onclick", 'saveForm()');
        //displaying and setting Add button which adds new row in form
        var newAdd = document.createElement('input');
        newAdd.type = "button";
        newAdd.textContent = "Add new";
        newAdd.id = "Add" + rowsCount;
        newAdd.onclick = "createNewRowForm()";
    }

}



function showFoundedTemplate(htmlData) {
    document.getElementById('form block').innerHTML = htmlData;
}








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
    //creating dropdown list with input type options
    var newInputDrop = document.createElement('select');
    newInputDrop.id = "inputType" + rowsCount;
    newInputDrop.className = "leftMarginForm";

    var option2 = document.createElement("option");
    option2.text = "Check Box";
    option2.setAttribute('value', 'Check Box');
    option2.setAttribute('selected', false);
    option2.id = "opt" + (rowsCount) + "" + "2";
    newInputDrop.add(option2);
    var option3 = document.createElement("option");
    option3.text = "Radio Button";
    option3.id = "opt" + (rowsCount) + "" + "3";
    option3.setAttribute('selected', false);
    option3.setAttribute('value', 'Radio Button');


    newInputDrop.add(option3);
    var option1 = document.createElement('option');

    option1.text = "Text Box";
    option1.id = "opt" + (rowsCount) + "" + "1";
    option1.setAttribute('selected', true);
    option1.setAttribute('value', 'Text Box');
    newInputDrop.add(option1);
    newInputDrop.className = "formDrop " + rowsCount;
    newInputDrop.setAttribute("onchange", "createAdditions(this.id,this.value)");
    //adding dropdown to its parent
    newDiv.appendChild(newInputDrop);
    var newTypeDrop = document.createElement('select');
    newTypeDrop.id = "type" + rowsCount;
    var opt1 = document.createElement('option');
    //creating options for input restrictions
    opt1.text = "None";
    opt1.id = "type" + rowsCount + "" + "1";
    opt1.selected = true;

    var opt2 = document.createElement("option");
    opt2.text = "Mandatory";
    opt2.id = "type" + rowsCount + "" + "2";
    opt2.selected = false;
    newTypeDrop.add(opt2);
    var opt3 = document.createElement("option");
    opt3.text = "Numeric";
    opt3.id = "type" + rowsCount + "" + "3";
    opt3.selected = false;
    newTypeDrop.add(opt3);
    newTypeDrop.add(opt1);

    newTypeDrop.id = "typeDrop " + rowsCount;
    newTypeDrop.className = "leftMarginForm";
    newTypeDrop.setAttribute('onchange', 'setQuantity(this.id);')
    newDiv.append(newTypeDrop);
    var newAdd = document.createElement('input');
    newAdd.type = "button";
    newAdd.value = "Add new";
    newAdd.className = "leftMarginForm";
    newAdd.id = "Add" + rowsCount;
    newAdd.setAttribute("onclick", "createAdditions(this.id,this.value);");
    newDiv.append(newAdd);

    //kreiranje i dodavanje horizontalne linije

    //povećavanje varijable zbog identificiranja redova formulara
    rowsCount++;
    console.log(rowsCount);
    node.appendChild(newDiv);


}

function setQuantity(id) {
    row = id.charAt(9);

    var quantity = document.getElementById('typeDrop ' + row).value;
    console.log(quantity + "   sssssssssss")
    if (quantity == 'None') {
        document.getElementById('type' + row + "" + "1").setAttribute('selected', "true");
        document.getElementById('type' + row + "" + "2").removeAttribute('selected');
        document.getElementById('type' + row + "" + "3").removeAttribute('selected');
    }
    else if (quantity == 'Mandatory') {
        document.getElementById('type' + row + "" + "1").removeAttribute('selected');
        document.getElementById('type' + row + "" + "2").setAttribute('selected', "true");
        document.getElementById('type' + row + "" + "3").removeAttribute('selected');
    }
    else {
        document.getElementById('type' + row + "" + "1").removeAttribute('selected');
        document.getElementById('type' + row + "" + "2").removeAttribute('selected');
        document.getElementById('type' + row + "" + "3").setAttribute('selected', "true");
    }
}







//function will add dropdowns for radio an checkbox quantity options and will remove all elements which are not needed
function createAdditions(id, selected) {
    var row = id.charAt(9);

    console.log(row + 'rrrrrrrrrrrrred')
    if (id.charAt(0) === 'i' && selected == 'Radio Button') {
        var element = document.getElementById('checkCoun' + id.charAt(9));
        if (element) {
            element.remove();
        }
        //remove checkbox label input if they exists
        removeCheckInputs(id.charAt(9));

        document.getElementById('opt' + row + "" + "1").removeAttribute('selected');
        document.getElementById('opt' + row + "" + "2").removeAttribute('selected');
        document.getElementById('opt' + row + "" + "3").setAttribute('selected', true);

        createRadioInputCount(id);
    }
    else if (id.charAt(0) === 'i' && selected == 'Check Box') {
        var element = document.getElementById('radioCoun' + id.charAt(9));
        if (element) {
            element.remove();
        }
        removeRadioInputs(id.charAt(9));
        createCheckBoxInputCount(id);

        document.getElementById('opt' + row + "" + "2").setAttribute('selected', true);
        document.getElementById('opt' + row + "" + "3").removeAttribute('selected');
        document.getElementById('opt' + row + "" + "1").removeAttribute('selected');


    }
    else if (id.charAt(0) === 'i' && selected == 'Text Box') {
        document.getElementById('opt' + row + "" + "2").removeAttribute('selected');
        document.getElementById('opt' + row + "" + "3").removeAttribute('selected');
        document.getElementById('opt' + row + "" + "1").setAttribute('selected', true);
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

//function which will create dropbox with options 
function createRadioInputCount(id) {

    var row = id.charAt(9);
    var existingDiv = document.getElementById('row' + row);
    var newRadioCountInput = document.createElement('select');
    newRadioCountInput.id = "radioCoun" + row;
    var option1 = document.createElement('option');
    option1.text = "1"
    option1.id="quantityRadio"+row+""+"1";
    option1.selected=true;
    newRadioCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2"
    option2.id="quantityRadio"+row+""+"2";
    newRadioCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    option3.id="quantityRadio"+row+""+"3";
    newRadioCountInput.add(option3);
    newRadioCountInput.className = "leftMarginForm";
    var typeDrop = document.getElementById('row' + row)
    existingDiv.insertBefore(newRadioCountInput, typeDrop.childNodes[3]);
    document.getElementById("radioCoun" + row).setAttribute("onchange", "createRadio(this.id,this.value);");

    createRadio(id, 1);
}
//function will add droplist for checkbox input quantity
function createCheckBoxInputCount(id) {

    var row = id.charAt(9);
    var existingDiv = document.getElementById('row' + row);
    var newCheckCountInput = document.createElement('select');
    newCheckCountInput.id = "checkCoun" + row;
    var option1 = document.createElement('option');
    option1.text = "1"
    option1.selected=true;
    option1.selected="true";
    option1.id="quantityCheck"+row+""+"1";
    newCheckCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2";
    option2.id="quantityCheck"+row+""+"2";
    newCheckCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    option3.id="quantityCheck"+row+""+"3";
    newCheckCountInput.add(option3);
    newCheckCountInput.className = "leftMarginForm";
    var typeDrop = document.getElementById('row' + row)
    existingDiv.insertBefore(newCheckCountInput, typeDrop.childNodes[3]);
    document.getElementById("checkCoun" + row).setAttribute("onchange", "createCheckBox(this.id,this.value);");

    createCheckBox(id, 1);
}
//function will add text input for radio button label on call
function createRadio(id, value) {

    //this will return the row where radio count is called
    var row = id.charAt(9);
    console.log(row);
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        document.getElementById('quantityRadio'+row+""+"1").setAttribute("selected",true);
        document.getElementById('quantityRadio'+row+""+"2").removeAttribute('selected');
        document.getElementById('quantityRadio'+row+""+"3").removeAttribute('selected');
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
        document.getElementById('quantityRadio'+row+""+"1").removeAttribute('selected');
        document.getElementById('quantityRadio'+row+""+"2").setAttribute("selected",true);
        document.getElementById('quantityRadio'+row+""+"3").removeAttribute('selected');
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
        document.getElementById('quantityRadio'+row+""+"1").removeAttribute('selected');
        document.getElementById('quantityRadio'+row+""+"3").setAttribute("selected",true);
        document.getElementById('quantityRadio'+row+""+"2").removeAttribute('selected');
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('count' + row + " " + 2);
        if (!element2) {
            var newRadioInput = document.createElement('input');
            newRadioInput.type = "text";
            newRadioInput.id = "countRadio" + row + " " + (value - 1);
            newRadioInput.placeholder = "Radio button " + (value - 1) + " label...";
            newRadioInput.style.display = "block"
            newRadioInput.style.marginLeft = "250px";
            newRadioInput.style.marginTop = "15px";
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
    newRadioInput.style.display = "block";
    newRadioInput.style.marginLeft = "250px";
    newRadioInput.style.marginTop = "15px";
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newRadioInput);

}
function createCheckBox(id, value) {

    //this will return the row where radio count is called
    var row = id.charAt(9);
    console.log(row);
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        document.getElementById('quantityCheck'+row+""+"2").removeAttribute('selected');
        document.getElementById('quantityCheck'+row+""+"1").setAttribute("selected",true);
        document.getElementById('quantityCheck'+row+""+"3").removeAttribute('selected');
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
        document.getElementById('quantityCheck'+row+""+"1").removeAttribute('selected');
        document.getElementById('quantityCheck'+row+""+"2").setAttribute("selected",true);
        document.getElementById('quantityCheck'+row+""+"3").removeAttribute('selected');
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
        document.getElementById('quantityCheck'+row+""+"2").removeAttribute('selected');
        document.getElementById('quantityCheck'+row+""+"3").setAttribute("selected",true);
        document.getElementById('quantityCheck'+row+""+"1").removeAttribute('selected');
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('countCheck' + row + " " + 2);
        if (!element2) {
            var newCheckInput = document.createElement('input');
            newCheckInput.type = "text";
            newCheckInput.id = "countCheck" + row + " " + (value - 1);
            newCheckInput.placeholder = "Check box " + (value - 1) + " label...";
            newCheckInput.style.display = "block";
            newCheckInput.style.marginLeft = "250px";
            newCheckInput.style.marginTop = "15px";
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
    newCheckInput.style.marginLeft = "250px";
    newCheckInput.style.marginTop = "15px";
    var existingDiv = document.getElementById("row" + row);
    existingDiv.appendChild(newCheckInput);

}
//function will remove all radio buttons if input type is changed
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
//function will remove all checkbox inputs if input type is changed
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
var forms = new Map();
//function will save form template saving its html elements
function saveForm() {
    console.log(rowsCount);
    var test;
    var numberOdRows = rowsCount - 1;
    var formName = document.getElementById('search');
    if (formName) {
        var Name = formName.value;
        var form = [];
        //loop will add every row to its object
        for (var i = 0; i < numberOdRows; i++) {
            if (document.getElementById('inpt' + (i + 1))) {
                document.getElementById('inpt' + (i + 1)).defaultValue = document.getElementById('inpt' + (i + 1)).value;
            }
            if (document.getElementById('countCheck' + (i + 1) + " 1")) {
                document.getElementById('countCheck' + (i + 1) + " 1").defaultValue = document.getElementById('countCheck' + (i + 1) + " 1").value;
            }
            if (document.getElementById('countCheck' + (i + 1) + " 2")) {
                document.getElementById('countCheck' + (i + 1) + " 2").defaultValue = document.getElementById('countCheck' + (i + 1) + " 2").value;
            }
            if (document.getElementById('countCheck' + (i + 1) + " 3")) {
                document.getElementById('countCheck' + (i + 1) + " 3").defaultValue = document.getElementById('countCheck' + (i + 1) + " 3").value;
            }
            if (document.getElementById('countRadio' + (i + 1) + " 1")) {
                document.getElementById('countRadio' + (i + 1) + " 1").defaultValue = document.getElementById('countRadio' + (i + 1) + " 1").value;
            }
            if (document.getElementById('countRadio' + (i + 1) + " 2")) {
                document.getElementById('countRadio' + (i + 1) + " 2").defaultValue = document.getElementById('countRadio' + (i + 1) + " 2").value;
            }
            if (document.getElementById('countRadio' + (i + 1) + " 3")) {
                console.log('noooooooooooooooooooooooo')
                document.getElementById('countRadio' + (i + 1) + " 3").defaultValue = document.getElementById('countRadio' + (i + 1) + " 3").value;
            }
            if (document.getElementById('radioCoun' + (i + 1))) {
                document.getElementById('radioCoun' + (i + 1)).selectedValue = document.getElementById('radioCoun' + (i + 1)).selectedValue;
            }
            if (document.getElementById('checkCoun' + (i + 1))) {
                document.getElementById('checkCoun' + (i + 1)).selected = document.getElementById('checkCoun' + (i + 1)).value;
            }
            if (document.getElementById('typeDrop ' + (i + 1))) {
                document.getElementById('typeDrop ' + (i + 1)).selected = document.getElementById('typeDrop ' + (i + 1)).value;
            }
            if (document.getElementById('formDrop ' + (i + 1))) {
                document.getElementById('formDrop ' + (i + 1)).selectedValue = document.getElementById('formDrop ' + (i + 1)).selectedIndex;
            }
        }

        //each completed form data will be added to Map and the key will be form template name
        //if there is a record about form,form is being updated,selection will delete old data about form and new one will be added
        if (forms.has(Name)) {
            forms.delete(Name);
        }
        forms.set(Name, form);
        console.log(forms);
        var node = document.getElementById('form block').innerHTML;
        console.log(node);
        addTemplateToDB(node, Name, "formsTemplate");
    }
}