
var rowsCount = 1;
function openTab(evt, tabName) {

    var i, tabcontent, tablinks;
   
    //hiding all block with class tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    updateFormularList();
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
        updateFormularList();
    }
    else {
        document.getElementById('mainContainer').innerHTML = "<h2>Error!IndexedDB is not supported<br>Try other browser!</h2>";
    }

}








//function which will search for wanted formular template and will offer creating new template if wanted is not founded
function searchForFormular() {
    if (document.getElementById('search').value != "") {
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

        var data = searchforTemplate(document.getElementById('search').value);


        if (data) {
            //if template is founded it will be passed to function to display it

            //save button will be added for template editing
            var node = document.getElementById("saveButton");

            var saveButton = document.createElement('button');
            saveButton.value = "Save";
            saveButton.textContent = "Save";
            saveButton.id = "saveForm";
            saveButton.className = "saveButton";
            node.append(saveButton);
            document.getElementById('saveForm').setAttribute("onclick", 'saveForm()');
            htmlData = "";

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


}



function showFoundedTemplate(htmlData) {
    document.getElementById('form block').innerHTML = htmlData;
    //number od rows will be retrieved for case user add more rows
    rowsCount = document.getElementById('form block').childElementCount + 1;
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
    newLabel.id = "label " + rowsCount;
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
    newAdd.setAttribute("onclick", "createNewRowForm();");
    newDiv.append(newAdd);

    //kreiranje i dodavanje horizontalne linije

    //povećavanje varijable zbog identificiranja redova formulara
    rowsCount++;
   
    node.appendChild(newDiv);


}

function setQuantity(id) {
    row = id.charAt(9);

    var quantity = document.getElementById('typeDrop ' + row).value;
   
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
    else if (quantity == "Numeric") {
        document.getElementById('type' + row + "" + "1").removeAttribute('selected');
        document.getElementById('type' + row + "" + "2").removeAttribute('selected');
        document.getElementById('type' + row + "" + "3").setAttribute('selected', "true");
    }
}







//function will add dropdowns for radio an checkbox quantity options and will remove all elements which are not needed
function createAdditions(id, selected) {
    var row = id.charAt(9);

    //block off selections will remove numeric input type if input is check box or radio button
    //also if user choose text box input it will check if numeric option is available and if not it will add it
    if (selected == "Check Box" || selected == "Radio Button") {
        document.getElementById('type' + row + "3").remove();
    }
    else if (selected == "Text Box") {
        if (!document.getElementById('type' + row + '3')) {
            var node = document.getElementById('typeDrop ' + row);
            var opt = document.createElement('option');
            opt.textContent = "Numeric";
            opt.id = 'type' + row + '3';
            node.appendChild(opt);
        }
    }

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
    option1.id = "quantityRadio" + row + "" + "1";
    option1.selected = true;
    newRadioCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2"
    option2.id = "quantityRadio" + row + "" + "2";
    newRadioCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    option3.id = "quantityRadio" + row + "" + "3";
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
    option1.selected = true;
    option1.selected = "true";
    option1.id = "quantityCheck" + row + "" + "1";
    newCheckCountInput.add(option1);
    var option2 = document.createElement('option');
    option2.text = "2";
    option2.id = "quantityCheck" + row + "" + "2";
    newCheckCountInput.add(option2);
    var option3 = document.createElement('option');
    option3.text = "3"
    option3.id = "quantityCheck" + row + "" + "3";
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
  
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        document.getElementById('quantityRadio' + row + "" + "1").setAttribute("selected", true);
        document.getElementById('quantityRadio' + row + "" + "2").removeAttribute('selected');
        document.getElementById('quantityRadio' + row + "" + "3").removeAttribute('selected');
        var element1 = document.getElementById('countRadio' + row + " " + 1);
       
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
        document.getElementById('quantityRadio' + row + "" + "1").removeAttribute('selected');
        document.getElementById('quantityRadio' + row + "" + "2").setAttribute("selected", true);
        document.getElementById('quantityRadio' + row + "" + "3").removeAttribute('selected');
        var element2 = document.getElementById('countRadio' + row + " " + 2);
     
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
        document.getElementById('quantityRadio' + row + "" + "1").removeAttribute('selected');
        document.getElementById('quantityRadio' + row + "" + "3").setAttribute("selected", true);
        document.getElementById('quantityRadio' + row + "" + "2").removeAttribute('selected');
        //if radio button 2 doesn't exist and count 3 is called it will add radio 2,and later at the end it will add radio 3 button
        var element2 = document.getElementById('countRadio' + row + " " + "2");
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
   
    //if user change it's mind and chose one input this block will remove all radio inputs and add one at the end of function
    if (value === '1') {
        document.getElementById('quantityCheck' + row + "" + "2").removeAttribute('selected');
        document.getElementById('quantityCheck' + row + "" + "1").setAttribute("selected", true);
        document.getElementById('quantityCheck' + row + "" + "3").removeAttribute('selected');
        var element1 = document.getElementById('countCheck' + row + " " + 1);
      
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
        document.getElementById('quantityCheck' + row + "" + "1").removeAttribute('selected');
        document.getElementById('quantityCheck' + row + "" + "2").setAttribute("selected", true);
        document.getElementById('quantityCheck' + row + "" + "3").removeAttribute('selected');
        var element2 = document.getElementById('countCheck' + row + " " + 2);
      
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
        document.getElementById('quantityCheck' + row + "" + "2").removeAttribute('selected');
        document.getElementById('quantityCheck' + row + "" + "3").setAttribute("selected", true);
        document.getElementById('quantityCheck' + row + "" + "1").removeAttribute('selected');
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

//function will save form template saving form code
function saveForm() {


    var numberOdRows = rowsCount - 1;
    var formName = document.getElementById('search');
    if (formName) {
        var Name = formName.value;

        //loop will update html code an prepare it for save to database
        //html elemets properties will be added and updated
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

        //after html code is updated and adjusted it will be stored to variable

        var node = document.getElementById('form block').innerHTML;
     
        //here function will be called to store new or updated template,along with template code function will get template name
        //template name will be used as key in database
        addTemplateToDB(node, Name);
        generateAndSaveFormularTemplate();
    }
}

//function will generate and update html code and prepare it for save
function generateAndSaveFormularTemplate() {
    rows = document.getElementById('form block').childElementCount;
    var parentNode = document.createElement('div');
  
    for (var i = 0; i < rows; i++) {
        var rowNode = document.createElement('div');

        var newLabel = document.createElement('label');
        newLabel.textContent = document.getElementById('inpt' + (i + 1)).value;
        if (document.getElementById('typeDrop ' + (i + 1) + "").value == "Mandatory") {
            newLabel.textContent += "*";
        }
        if (document.getElementById('typeDrop ' + (i + 1) + "").value == "Numeric") {
            newLabel.textContent += "(numeric)";
        }
        newLabel.className = "leftMarginForm";
        newLabel.id = "lbl " + (i + 1);
        rowNode.appendChild(newLabel);
        if (document.getElementById('inputType' + (i + 1)).value == "Text Box") {
           
            var newInput = document.createElement('input');
            newInput.type = "text";
            newInput.id = "text" + (i + 1);
            newInput.value = " ";

            newInput.setAttribute('oninput', "setTextValue(this.id);")
            newInput.style.paddingRight = "20%";
            newInput.style.cssFloat = "right";
            newInput.style.marginRight = "30%";
            rowNode.appendChild(newInput);
            var line=document.createElement('hr');
            rowNode.appendChild(line);
        }


        var check1 = document.getElementById('countRadio' + (i + 1) + " 1");

        var check2 = document.getElementById('countRadio' + (i + 1) + " 2");

        var check3 = document.getElementById('countRadio' + (i + 1) + " 3");

        //checking if two radios are in store ,setting them and adding to parent node
        if (check1 && !check2 && !check3) {
            var radioBlock = document.createElement('div');

            radioBlock.style.display = "block";
            radioBlock.style.marginLeft = "150px";

            radioBlock.innerHTML = "<form><input onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value" + (i + 1) + "\"> " + check1.value + "<br></form>";
            rowNode.appendChild(radioBlock);
            rowNode.appendChild(document.createElement('hr'));

        }
        if (check1 && check2 && !check3) {
            var radioBlock = document.createElement('div');

            radioBlock.style.display = "block";
            radioBlock.style.marginLeft = "150px";

            radioBlock.innerHTML = "<form><input onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value" + (i + 1) + "\"> " + check1.value + "<br><input onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value" + (i + 2) + "\"> " + check2.value + "<br></form>";
            rowNode.appendChild(radioBlock);
            rowNode.appendChild(document.createElement('hr'));

        }
        //checking if all three radios are present in store,setting them and adding to parent node
        if (check1 && check2 && check3) {
            var radioBlock = document.createElement('div');

            radioBlock.style.display = "block";
            radioBlock.style.marginLeft = "150px";
            radioBlock.innerHTML = "<form><input onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value" + (i + 1) + "\"> " + check1.value + "<br><input onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value" + (i + 2) + "\"> " + check2.value + "<br><input  onclick=\"radioChangeState(this.id)\" name=\"option\" type=\"radio\" id=\"radio" + (i + 1) + " 3\" value=\"value" + (i + 3) + "\"> " + check3.value + "<br></form>";
            rowNode.appendChild(radioBlock);
            rowNode.appendChild(document.createElement('hr'));
        }


        var check1 = document.getElementById('countCheck' + (i + 1) + " 1");

        var check2 = document.getElementById('countCheck' + (i + 1) + " 2");

        var check3 = document.getElementById('countCheck' + (i + 1) + " 3");
        //selection will be executed if only first checkbox is present in store
        if (check1 && !check2 && !check3) {
            var checkBlock = document.createElement('div');
            checkBlock.style.display = "block";
            checkBlock.style.marginLeft = "150px";
            checkBlock.innerHTML = "<form><input  onchange=\"checkBoxStateChanged(this.id)\" type=\"checkbox\" id=\"check" + (i + 1) + "1\">" + check1.value + "</form>";
            rowNode.appendChild(checkBlock);
            rowNode.appendChild(document.createElement('hr'));
        }

        //selection will be executed if two checkboxes are present in store
        if (check1 && check2 && !check3) {
            var checkBlock = document.createElement('div');
            checkBlock.style.display = "block";
            checkBlock.style.marginLeft = "150px";
            checkBlock.innerHTML = "<form><input onchange=\"checkBoxStateChanged(this.id)\"  type=\"checkbox\" id=\"check" + (i + 1) + " 1\">" + check1.value + "<br><input checked=\"unchecked\" onchange=\"checkBoxStateChanged(this.id)\" type=\"checkbox\" id=\"check" + (i + 1) + " 2\">" + check2.value + "</form>";
            rowNode.appendChild(checkBlock);
            rowNode.appendChild(document.createElement('hr'));
        }

        //selection will be executed if all three checkboxes are present
        if (check1 && check2 && check3) {
            var checkBlock = document.createElement('div');
            checkBlock.style.display = "block";
            checkBlock.style.marginLeft = "150px";
            checkBlock.innerHTML = "<form><input onclick=\"checkBoxStateChanged(this.id)\"  type=\"checkbox\" id=\"check" + (i + 1) + " 1\">" + check1.value + "<br><input  onclick=\"checkBoxStateChanged(this.id)\" type=\"checkbox\" id=\"check" + (i + 1) + " 2\">" + check2.value + "<br><input  onclick=\"checkBoxStateChanged(this.id)\" type=\"checkbox\" id=\"check" + (i + 1) + " 3\">" + check3.value + "</form>";
            rowNode.appendChild(checkBlock);
            rowNode.appendChild(document.createElement('hr'));
        }
        parentNode.appendChild(rowNode);
      
    }
    //formular template will be aded in two object stores,first templates for admin panel and second as empty version for formular tab
    addFormularTemplateToDB(parentNode.innerHTML, document.getElementById('search').value);
    addToFormularData(parentNode.innerHTML, document.getElementById('search').value);
    //after save function will refresh formular list in formular tab
    updateFormularList();
}

// on check or uncheck function will update html code
function checkBoxStateChanged(id) {
   
    if (document.getElementById(id).getAttribute('checked')) {
     
        document.getElementById(id).removeAttribute('checked')
    }
    else {
     
        document.getElementById(id).setAttribute('checked', true);
    }
}

//function will not allow special chars in version input an search input
//value in search input is used as name of new template
function checkInput(id) {
  
    var str = document.getElementById(id).value;
 
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';/{}|\\":<>\?]/);
   
    if (pattern.test(str)) {
        alert('Special chars are not allowed!')
        document.getElementById(id).value = "";
    }

}
//function will save checked radio button and update html code
function radioChangeState(id) {
    var str = id;
    var res = str.split(" ", 1).toString();
    var row = res.substr(5);

    var radio = str.substr(str.length - 1, 1);
   
    if (radio == '1') {
        document.getElementById('radio' + row + ' 1').setAttribute('checked', 'true');
        document.getElementById('radio' + row + ' 2').removeAttribute('checked');
        document.getElementById('radio' + row + ' 3').removeAttribute('checked');

    }
    else if (radio == '2') {
        document.getElementById('radio' + row + ' 2').setAttribute('checked', 'true');
        document.getElementById('radio' + row + ' 1').removeAttribute('checked');
        document.getElementById('radio' + row + ' 3').removeAttribute('checked');
    }
    else if (radio == '3') {
        document.getElementById('radio' + row + ' 3').setAttribute('checked', 'true');
        document.getElementById('radio' + row + ' 2').removeAttribute('checked');
        document.getElementById('radio' + row + ' 1').removeAttribute('checked');
    }

}
function setTextValue(id) {
    var iD = id;
    row = iD.substr(iD.length - 1, 1);
  
    document.getElementById(id).setAttribute('value', document.getElementById(id).value);
}



function numericInputValidation(value) {
    var reg = new RegExp('^\\d+$');
    if (reg.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
//function will loop trough all rows and will break saving on first unmeet condition
//if all conditions are meet it will return true value so procces could countinue
function validateFormularData() {
   
    var passed = true;
    rows = document.getElementById('formularContent').childElementCount;
  
    for (var i = 0; i < rows; i++) {
       
     
            var str = document.getElementById('lbl ' + (i + 1)).textContent;
          
            if (str.indexOf("*") > 0) {
                if (document.getElementById('text' + (i + 1))) {
                    var input = document.getElementById('text' + (i + 1)).value;
                    if (input != "") {
                        return true;
                    }
                }
                else if (document.getElementById('radio' + rows + " 1")) {
                    if (document.getElementById('radio' + rows + " 1").hasAttribute('checked')) {
                        return true;
                    }
                }
                else if (document.getElementById('radio' + rows + " 2")) {
                    if (document.getElementById('radio' + rows + " 2").hasAttribute('checked')) {
                        return true;
                    }
                }
                else if (document.getElementById('radio' + rows + " 3")) {
                    if (document.getElementById('radio' + rows + " 3").hasAttribute('checked')) {
                        return true;
                    }
                }

                else if (document.getElementById("check" + rows + " 1")) {
                   
                    if (document.getElementById('check' + rows + " 1").hasAttribute('checked')) {
                       
                        return true;
                    }
                }
                else if (document.getElementById('check' + rows + " 2")) {
                    if (document.getElementById('check' + rows + " 2").hasAttribute('checked')) {
                      
                        return true;
                    }
                }
                else if (document.getElementById('check' + rows + " 3")) {
                    if (document.getElementById('check' + rows + " 3").hasAttribute('checked')) {
                        return true;
                    }
                }
            }
            else if (str.search('(numeric)') > -1) {
                var input = document.getElementById('text' + (i + 1)).value;
                if (numericInputValidation(input) == false) {
                    return false;
                }
                else{
                    return true;
                }

            }
        

    }
    //function will return false at teh end because none od conditions are meet
    return true;
}