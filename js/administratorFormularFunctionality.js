function showFoundedFormular(form) {

   console.log(form.length);
   //loop which will create  all rows stored 
   for (var i = 0; i < form.length; i++) {
      var node = document.getElementById('form block');
      var newDivRow = document.createElement('div');

      //creating label for input label
      var newLabel = document.createElement('label');
      newLabel.textContent = 'Element ' + (i + 1) + ' :';
      newLabel.className = "leftMarginForm";
      newLabel.id = "lbl " + rowsCount;
      //adding label to div element,label have id and class assigned
      newDivRow.appendChild(newLabel);
      var newInput = document.createElement('input');
      newInput = form[i].Label;
      newDivRow.appendChild(newInput);
      var typeDrop = form[i].rowType;
      newDivRow.append(typeDrop);
      //checking stored elements and applying them to row if they exist with stored values and atributes
      var rowRadioCount = form[i].rowRadioCunt;
      if (rowRadioCount) {
         newDivRow.appendChild(rowRadioCount);
      }
      var rowCheckCount = form[i].rowCheckCunt;
      if (rowCheckCount) {
         newDivRow.appendChild(rowCheckCount);
      }
      var rowRadio1=form[i]. rowRadioLabel1;
      if(rowRadio1)
      {
         newDivRow.appendChild(rowRadio1);
      }
      var rowRadio2=form[i]. rowRadioLabel2;
      if(rowRadio2)
      {
         newDivRow.appendChild(rowRadio2);
      }
      var rowRadio3=form[i]. rowRadioLabel3;
      if(rowRadio3)
      {
         newDivRow.appendchild(rowRadio3);
      }
      var rowCheck1=form[i].rowCheckLabel1;
      if(rowCheck1)
      {
         newDivRow.appendChild(rowCheck1);
      }
      var rowCheck2=form[i].rowCheckLabel2;
      if(rowCheck2)
      {
         newDivRow.appendChild(rowCheck2);
      }
      var rowCheck3=form[i].rowCheckLabel2;
      if(rowCheck3)
      {
         newDivRow.appendChild(rowCheck3);
      }
      var type=form[i].type;
      newDivRow.appendChild(type);
      var addBtn=form[i].add;
      if(addBtn)
      {
         newDivRow.appendChild(addBtn);
      }
      //adding newly created div row to its parent div
      node.appendChild(newDivRow);
      rowsCount++;
   }
rowsCount-=1;
}