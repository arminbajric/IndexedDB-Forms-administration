var formsContent = new Map();
function loadTemplate() {
    //geting selected value from forms list
    var selected = document.getElementById('formList');

    console.log(selected.value)
    var template = forms.get(selected.value);
    //check if template data exists
    var content;
    console.log(formsContent);
    if (formsContent.has(selected.value)) {
        
        content=formsContent.get(selected.value);

        console.log('trueeeeeeeeeeeee');
        console.log(content[0].radio);
    }
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
                console.log("Radios should be created");
                radioBlock.style.display = "block";
                radioBlock.style.marginLeft = "150px";
                radioBlock.innerHTML = "<form><input type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value"+(i+1)+"\"> " + check1.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value"+(i+2)+"\"> " + check2.value + "<br></form>";
                newDiv.appendChild(radioBlock);
                newDiv.appendChild(document.createElement('hr'));

            }
            //checking if all three radios are present in store,setting them and adding to parent node
            if (check1 && check2 && check3) {
                var radioBlock = document.createElement('div');

                radioBlock.style.display = "block";
                radioBlock.style.marginLeft = "150px";
                radioBlock.innerHTML = "<form><input type=\"radio\" id=\"radio" + (i + 1) + " 1\" value=\"value"+(i+1)+"\"> " + check1.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 2\" value=\"value"+(i+2)+"\"> " + check2.value + "<br><input type=\"radio\" id=\"radio" + (i + 1) + " 3\" value=\"value"+(i+3)+"\"> " + check3.value + "<br></form>";
                newDiv.appendChild(radioBlock);
                newDiv.appendChild(document.createElement('hr'));
            }
            //if there is stored template data checks if there is checked radio button and sets it true if exists
            if (content[i].radio) {
                document.getElementById('radio' + (i + 1) + " " + content[i].radio).checked = true;
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
            //checks if there is record about checkbox1 and sets it true if exists
            if (content[i].chec && content.checkbox1) {
                document.getElementById('radio' + (i + 1) + " 1").checked = true;
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
            //checks if there is record about checkbox2 and checkbox sets it true if exists
            if (content && content.checkbox2) {

                document.getElementById('radio' + (i + 1) + " 2").checked = true;
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
            if (content && content.checkbox2) {

                document.getElementById('radio' + (i + 1) + " 3").checked = true;
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
}




function saveFormContent() {
    var row = [];
    var selected = document.getElementById('formList');
    var formContentName = selected.value;
    var template = forms.get(selected.value);
    for (var i = 0; i < template.length; i++) {

        var textBoxContent = document.getElementById('text' + (i + 1));
        var checkedRadioNumber;
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
                checkBox1 = '1';
            }
        }
        var checkBox2;
        if (document.getElementById('check' + (i + 1) + ' 2')) {
            if (document.getElementById('check' + (i + 1) + ' 2').checked) {
                checkBox2 = '1';
            }
        }
        var checkBox3;
        if (document.getElementById('check' + (i + 1) + ' 3')) {
            if (document.getElementById('check' + (i + 1) + ' 3').checked) {
                checkBox3 = '1';
            }
        }

        var content = [{
            text: textBoxContent,
            radio: checkedRadioNumber,
            checkbox1: checkBox1,
            checkbox2: checkBox2,
            checkbox3: checkBox3
        }];
        row.push(content);
    }
    formsContent.set(formContentName, row);
console.log(formsContent);
}