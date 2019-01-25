var formsContent = new Map();
function loadTemplate() {
    //geting selected value from forms list
    var selected = document.getElementById('formList');

    console.log(selected.value)
    var template = forms.get(selected.value);

    console.log(template);
    //getting parent node
    var node = document.getElementById('formularContent');
    //cleaning parent node
    node.innerHTML = "";
    //looping trough form rows
    if (selected.value != "Select formular") {
        for (var i = 0; i < template.length; i++) {
            //creating new div element for storing row elements
            var newDiv = document.createElement('div');
            newDiv.style.display = "block;"

            var newLabel = document.createElement('label');
            newLabel.id = "label" + (i + 1);
            newLabel.className = "leftMarginForm";
            //check if data is required to be filled or checked before save and adds appropriate chars to label if required
            if (template[i].type.value == "Mandatory") {
                newLabel.textContent = template[i].Label.value + "*";
            }
            else if (template[i].type.value == "Numeric") {
                newLabel.textContent = template[i].Label.value + "(num)";
            }
            else {
                newLabel.textContent = template[i].Label.value;
            }
            //adding row label
            newDiv.appendChild(newLabel);
            var newInput = document.createElement('input')
            //checking if row input type is text input,if it is text box will be added
            if (template[i].rowType.value == "Text Box") {
                newInput.type = "text";
                newInput.id = "text" + (i + 1);
                newInput.value=" ";
                newInput.style.paddingRight = "100px";
                newInput.style.cssFloat = "right";
                newInput.style.marginRight = "100px";
                newDiv.appendChild(newInput);
                newDiv.appendChild(document.createElement('hr'));
            }
            //geeting information about radio buttons list
            var check1 = template[i].rowRadioLabel1;

            var check2 = template[i].rowRadioLabel2;

            var check3 = template[i].rowRadioLabel3;
            //checking if two radios are in store ,setting them and adding to parent node
            if (check1 && check2 && !check3) {
                var radioBlock = document.createElement('div');

                radioBlock.style.display = "block";
                radioBlock.style.marginLeft = "150px";
                radioBlock.innerHTML = "<form><input type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value" + (i + 1) + "\"> " + check1.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value" + (i + 2) + "\"> " + check2.value + "<br></form>";
                newDiv.appendChild(radioBlock);
                newDiv.appendChild(document.createElement('hr'));

            }
            //checking if all three radios are present in store,setting them and adding to parent node
            if (check1 && check2 && check3) {
                var radioBlock = document.createElement('div');

                radioBlock.style.display = "block";
                radioBlock.style.marginLeft = "150px";
                radioBlock.innerHTML = "<form><input type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value" + (i + 1) + "\"> " + check1.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value" + (i + 2) + "\"> " + check2.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 3\" value=\"value" + (i + 3) + "\"> " + check3.value + "<br></form>";
                newDiv.appendChild(radioBlock);
                newDiv.appendChild(document.createElement('hr'));
            }


            check1 = template[i].rowCheckLabel1;
            check2 = template[i].rowCheckLabel2;
            check3 = template[i].rowCheckLabel3;
            //selection will be executed if only first checkbox is present in store
            if (check1 && !check2 && !check3) {
                var checkBlock = document.createElement('div');
                checkBlock.style.display = "block";
                checkBlock.style.marginLeft = "150px";
                checkBlock.innerHTML = "<form><input type=\"checkbox\" id=\"check" + (i + 1) + "1\">" + check1.value + "</form>";
                newDiv.appendChild(checkBlock);
                newDiv.appendChild(document.createElement('hr'));
            }

            //selection will be executed if two checkboxes are present in store
            if (check1 && check2 && !check3) {
                var checkBlock = document.createElement('div');
                checkBlock.style.display = "block";
                checkBlock.style.marginLeft = "150px";
                checkBlock.innerHTML = "<form><input type=\"checkbox\" id=\"check" + (i + 1) + " 1\">" + check1.value + "<br><input type=\"checkbox\" id=\"check" + (i + 1) + " 2\">" + check2.value + "</form>";
                newDiv.appendChild(checkBlock);
                newDiv.appendChild(document.createElement('hr'));
            }

            //selection will be executed if all three checkboxes are present
            if (check1 && check2 && check3) {
                var checkBlock = document.createElement('div');
                checkBlock.style.display = "block";
                checkBlock.style.marginLeft = "150px";
                checkBlock.innerHTML = "<form><input type=\"checkbox\" id=\"check" + (i + 1) + " 1\">" + check1.value + "<br><input type=\"checkbox\" id=\"check" + (i + 1) + " 2\">" + check2.value + "<br><input type=\"checkbox\" id=\"check" + (i + 1) + " 3\">" + check3.value + "</form>";
                newDiv.appendChild(checkBlock);
                newDiv.appendChild(document.createElement('hr'));
            }

            //newly create and setted div will be added to it's parent node and first row is completed,loop will create all the rest rows if they are present
            node.appendChild(newDiv);

        }
        var node = document.getElementById("saveButtonContent");
        node.innerHTML = "";
        var saveButton = document.createElement('button');
        saveButton.value = "Save";
        saveButton.textContent = "Save";
        saveButton.id = "saveFormContent";
        saveButton.className = "saveButton";
        node.append(saveButton);
        document.getElementById('saveFormContent').setAttribute("onclick", 'saveFormContent()');
    }
    else {
        var removeSave = document.getElementById('saveButtonContent');
        removeSave.innerHTML = "";
    }
    if (formsContent.get(document.getElementById('formList').value)) {
        addDataToTemplate(formsContent.get(document.getElementById('formList').value));
    }
}



//function will save inserted data
function saveFormContent() {
    var row = [];
    var selected = document.getElementById('formList');
    var formContentName = selected.value;
    //getting record name from map using name from formular drop list
    var template = forms.get(selected.value);
    //loop which will collect all form data row by row
    for (var i = 0; i < template.length; i++) {

        var textBoxContent = document.getElementById('text' + (i + 1));
        var checkedRadioNumber;
        //block of selections which will gather data about checked radios and checkboxes
        if (document.getElementById('radio' + (i + 1) + ' 1')) {
            if (document.getElementById('radio' + (i + 1) + ' 1').checked) {
                checkedRadioNumber = '1';
            }
        }
        else if (document.getElementById('radio' + (i + 1) + ' 2')) {
            if (document.getElementById('radio' + (i + 1) + ' 2').checked) {
                checkedRadioNumber = '2';
            }
        }
        else if (document.getElementById('radio' + (i + 1) + ' 3')) {
            if (document.getElementById('radio' + (i + 1) + ' 3').checked) {
                checkedRadioNumber = '3';
            }
        }
        var checkBox1;
        if (document.getElementById('check' + (i + 1) + ' 1')) {
            if (document.getElementById('check' + (i + 1) + ' 1').checked) {
                checkBox1 = 1;
            }
        }
        var checkBox2;
        if (document.getElementById('check' + (i + 1) + ' 2')) {
            if (document.getElementById('check' + (i + 1) + ' 2').checked) {
                checkBox2 = 1;
            }
        }
        var checkBox3;
        if (document.getElementById('check' + (i + 1) + ' 3')) {
            if (document.getElementById('check' + (i + 1) + ' 3').checked) {
                checkBox3 = 1;
            }
        }
        //row data will be at first saved as on object
        var content = {
            text: textBoxContent,
            radio: checkedRadioNumber,
            checkbox1: checkBox1,
            checkbox2: checkBox2,
            checkbox3: checkBox3
        };
        //here one row i pushed to array of rows
        row.push(content);
    }
    //when loop adds all rows and elements to array this selection will check is there a record already and if it does it will delete id and add new updated one with same key name
    if (formsContent.has(formContentName)) {
        formsContent.delete(formContentName);
    }
    else {
        formsContent.set(formContentName, row);
    }
    console.log(formsContent);
}
//function will load form data which was previously saved
function addDataToTemplate(data) {
    console.log(data)
   
    for (var i = 0; i < data.length; i++) {
        //next three selections will check checkboxes if there is a record about them
        if (data[i].checkbox2==1) {

            document.getElementById('check' + (i + 1) + " 2").checked = true;
        }
        
        if (data[i].checkbox3==1) {

            document.getElementById('check' + (i + 1) + " 3").checked = true;
        }
      
        if (data[i].checkbox1==1) {
            document.getElementById('check' + (i + 1) + " 1").checked = true;
        }
        //if there is stored template data checks if there is checked radio button and sets it true if exists
        if (data[i].radio) {
            document.getElementById('radio' + (i + 1) + " " + data[i].radio).checked = true;
        }
        //if there is a record about text field this will load data to texbox
        if (data[i].text) {
           
            document.getElementById('text' + (i + 1)).value=data[i].text.value;
            
        }
    }
}
//function will add options to formular droplist
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