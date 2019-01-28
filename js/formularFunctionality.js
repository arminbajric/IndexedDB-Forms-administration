function generateAndSaveFormularData() {
   
    var rows=document.getElementById('formularContent').childElementCount;
    for(var i=0;i<rows;i++)
    {
        if(document.getElementById('text'+(i+1)))
        {
            document.getElementById('text'+(i+1)).defaultValue=document.getElementById('text'+(i+1)).nodeValue;
        }
        if(document.getElementById('radio'+(i+1)+" 1"))
        {
            document.getElementById('radio'+(i+1)+" 1").setAttribute('checked',true);
            document.getElementById('radio'+(i+1)+" 2").removeAttribute('checked');
            document.getElementById('radio'+(i+1)+" 3").removeAttribute('checked');
        }
        if(document.getElementById('radio'+(i+1)+" 2"))
        {
            document.getElementById('radio'+(i+1)+" 2").setAttribute('checked',true);
            document.getElementById('radio'+(i+1)+" 3").removeAttribute('checked');
            document.getElementById('radio'+(i+1)+" 1").removeAttribute('checked');
        }
        if(document.getElementById('radio'+(i+1)+" 3"))
        {
            document.getElementById('radio'+(i+1)+" 3").setAttribute('checked',true);
            document.getElementById('radio'+(i+1)+" 2").removeAttribute('checked');
            document.getElementById('radio'+(i+1)+" 1").removeAttribute('checked');
        }
       
    }
    saveFormularData();
}