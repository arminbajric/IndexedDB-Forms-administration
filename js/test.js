
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
    //prikazivanje administrator taba tokom učitavanja stranice
    document.getElementById("Administrator").style.display = "block";
   updateFormular();

}
function updateFormular(){
    var node=document.getElementById('formList');
    node.innerHTML="";
    var defaultOption=document.createElement('option');
    defaultOption.textContent="Select formular";
    node.appendChild(defaultOption);
    var keys=forms.keys();
    for(var i=0;i<forms.size;i++)
    {
        var newOption=document.createElement('option');
        
        newOption.text=keys.next().value;
        newOption.id='option'+(i+1);
        node.appendChild(newOption);
        document.getElementById('formList').setAttribute("onchange",'loadTemplate()')
    }
}

//function which will search for wanted formular template and will offer creating new template if wanted is not founded
function searchForFormular(value) {
    //block which will reset form block for new search
    var node = document.getElementById('form block');
    if (node) {
        node.innerHTML = "";
    }
    var save = document.getElementById("saveButton");
    if (save) {
        save.innerHTML = "";
    }
    
    //block will check if wanted formular is in store
 
    if (forms.has(document.getElementById('search').value)) {
        console.log('formfounded');
        rowsCount=forms.get(document.getElementById('search').value).length+1;
        //calling function to show stored formular template
        showFoundedFormular(forms.get(document.getElementById('search').value));
        //adding save button to enable formular editing
        var node = document.getElementById("saveButton");

        var saveButton = document.createElement('button');
        saveButton.value = "Save";
        saveButton.textContent = "Save";
        saveButton.id = "saveForm";
        saveButton.className = "saveButton";
        node.append(saveButton);
        document.getElementById('saveForm').setAttribute("onclick", 'saveForm()');

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
            newRadioInput.style.marginLeft="250px";
            newRadioInput.style.marginTop="15px";
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
    newRadioInput.style.marginLeft="250px";
    newRadioInput.style.marginTop="15px";
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
            newCheckInput.style.marginLeft="250px";
            newCheckInput.style.marginTop="15px";
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
    newCheckInput.style.marginLeft="250px";
    newCheckInput.style.marginTop="15px";
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
var forms = new Map();
function saveForm() {
    console.log(rowsCount);
    var numberOdRows = rowsCount - 1;
    var formName = document.getElementById('search');
    if (formName) {
        var Name = formName.value;
        var form = [];
        for (var i = 0; i < numberOdRows; i++) {
            var rowLabel = document.getElementById('inpt' + (i + 1));
            var rowTypeDrop = document.getElementById('inputType' + (i + 1));

            var rowRadio1Label = document.getElementById('countRadio' + (i + 1) + " " + 1);

            var rowRadio2Label = document.getElementById('countRadio' + (i + 1) + " " + 2);

            var rowRadio3Label = document.getElementById('countRadio' + (i + 1) + " " + 3);

            var rowCheck1Label = document.getElementById('countCheck' + (i + 1) + " " + 1);

            var rowCheck2Label = document.getElementById('countCheck' + (i + 1) + " " + 2);

            var rowCheck3Label = document.getElementById('countCheck' + (i + 1) + " " + 3);
            var rowRadioDrop = document.getElementById('radioCoun' + (i + 1));
            var rowCheckDrop = document.getElementById('radioCoun' + (i + 1));
            var inputType = document.getElementById('typeDrop ' + (i + 1));
            var addButton = "";
            if (i == (numberOdRows - 1)) {
                addButton = document.getElementById('Add' + (i + 1));
            }
            var formRow = {
                Label: rowLabel,
                rowType: rowTypeDrop,
                rowRadioCunt: rowRadioDrop,
                rowRadioLabel1: rowRadio1Label,
                rowRadioLabel2: rowRadio2Label,
                rowRadioLabel3: rowRadio3Label,
                rowCheckCount: rowCheckDrop,
                rowCheckLabel1: rowCheck1Label,
                rowCheckLabel2: rowCheck2Label,
                rowCheckLabel3: rowCheck3Label,
                type: inputType,
                add: addButton
            };

            
            form.push(formRow);


        }
        if(forms.has(Name))
        {
         forms.delete(Name);
        }
        forms.set(Name, form);
        console.log(forms);
    }
}