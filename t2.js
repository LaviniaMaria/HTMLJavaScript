 var employees=new Array();
 var maxId=0;
 
     function createElement(tagName, parent, text) {
	
	    var element=document.createElement(tagName);
	    parent.appendChild(element);
	    if(text!==null)
			element.innerHTML=text;
	   
	}
	
	function createElementWithAttr(tagName, parent, text, attr, attrValue) {
	
	    var element=document.createElement(tagName);
	    element.setAttribute(attr,attrValue);
	    parent.appendChild(element);
		if(text!==null)
		   element.innerHTML=text;
		 
	}
	
 
	function addEmployee( id, firstName, lastName, age, department, link) {
	
	    if(id>maxId) 
		   maxId=id;
      
		var table=document.getElementsByTagName("tbody")[0];
		var row=document.createElement("tr");
		row.setAttribute("id",id);
		table.appendChild(row);
		
	    createElement("td",row,firstName);
		createElement("td",row,lastName);
		createElement("td",row,age);
        createElement("td",row,department);  
		    
        var data=document.createElement("td");
	   	createElementWithAttr("a",data,link,"href",link);
        row.appendChild(data);
		
	    addEditButton(row,id);
		addDeleteButton(row,id);
	
    }
	
	function addEditButton(row,id) {
	
	    var editTd=document.createElement("td");
		row.appendChild(editTd);
		var editButton=createButton("Edit","editEmployee("+id+")");
		editTd.appendChild(editButton);
		
	}
	
	function editEmployee(id) {
		
		var row=document.getElementById(id);
		tds=row.childNodes;
		
	    for(var i=0;i<tds.length-1;i++) {

		    var td=tds[i];
			var data=td.childNodes[0].nodeValue;
			var el=document.createElement("input");
			el.setAttribute("type","text");
			el.setAttribute("value",data);
			td.innerHTML="";
			td.appendChild(el);
		
		}
		
		row.removeChild(row.childNodes[5]);
		row.removeChild(row.childNodes[5]);
		
		addSaveButton(row,id);
		addCancelEditButton(row,id);
		
	}
	
   
	function add() {
        
        employees[0]={id:1,nume:"Gherasim",prenume:"Lavinia",varsta:21,departament:"IT",link:"http://facebook.com"};
        employees[1]={id:2,nume:"Grigoriu",prenume:"Cristiana",varsta:22,departament:"IT",link:"http://facebook.com"};
        employees[2]={id:3,nume:"Victor",prenume:"Grigoriu",varsta:23,departament:"IT",link:"http://facebook.com"};
        employees[3]={id:4,nume:"Adina",prenume:"Gherasim",varsta:22,departament:"IT",link:"http://facebook.com"};
        employees[4]={id:5,nume:"Maria",prenume:"Popa",varsta:25,departament:"Marketing",link:"http://facebook.com"};
		
        for(var i=0;i<5;i++) 
            addEmployee(employees[i].id,employees[i].prenume,employees[i].nume,employees[i].varsta,employees[i].departament,employees[i].link);
	    
    }

    function getValue(row,column) {
 
		var td=row.childNodes[column];
    	var child=td.childNodes[0];
		return child.value;
		 
	}
	
	function cancelAdd(id) {
	
	    var row=document.getElementById(id);
		row.remove();
		document.getElementById("addButton").disabled=false;
		
	}
	
    function saveEmployee(id) {

		var row=document.getElementById(id);
		
	    var firstName=getValue(row,0);
		var lastName=getValue(row,1);
		var age=getValue(row,2);
		var department=getValue(row,3);
		var profile=getValue(row,4);
		var values=[firstName,lastName,age,department,profile];
		
		tds=row.childNodes;
		for(var i=0;i<tds.length-2;i++) {
		
		    var td=tds[i];
			td.removeChild(td.childNodes[0]);
			td.innerHTML=values[i];
			
		}
		
		row.removeChild(row.childNodes[5]);
		row.removeChild(row.childNodes[5]);
		
		document.getElementById("addButton").disabled=false;
		addEditButton(row,id);
		addDeleteButton(row,id);
		
		deleteEmployeeFromArray(id);
		addEmployeeToArray(id,values[0],values[1],values[2],values[3],values[4]);

    }
	
	function addEmployeeToArray(id, firstName, lastName, age, department, link) {
	
	    if(id>maxId) 
		   maxId=id;
		  
		employees[employees.length]={id:id,nume:firstName,prenume:lastName,varsta:age,departament:department,link:link};
	
	}
	
	
	function deleteEmployeeFromArray(id) {
	
		for(var i=0;i<employees.length;i++)
			if(employees[i].id==id) 
				employees.splice(i,1+i);
				
	 
		for(var i=0;i<employees.length;i++)
			if(employees[i].id>maxId)
				maxId=employees[i].id;
			

	}
	
	function deleteEmployee(id) {
	
		var answer=confirm("Are you sure you want to delete?");
		if(answer==true) {
		
			row=document.getElementById(id);
			row.remove();
			deleteEmployeeFromArray(id);
			
	    }
	}	

    function createButton(value,callFunction) {
   
        var button=document.createElement("input");
        button.setAttribute("type","Button");
        button.setAttribute("value",value);
		button.setAttribute("onClick",callFunction);
		
		return button;
        
    }
	
	function addSaveButton(row,id) {
	
	    var saveButton=createButton("Save","saveEmployee("+id+")");
		 
        var data=document.createElement("td");
        row.appendChild(data);
        data.appendChild(saveButton);
		
	}
	
	function addDeleteButton(row,id) {
	
	    var saveButton=createButton("Delete","deleteEmployee("+id+")");
		 
        var data=document.createElement("td");
        row.appendChild(data);
        data.appendChild(saveButton);
		
	}
	
	function addCancelAddButton(row,id) {
                
        var cancelAddButton=createButton("Cancel","cancelAdd("+id+")");
               
        var data=document.createElement("td");
        row.appendChild(data);
        data.appendChild(cancelAddButton);

	}
	
	function addCancelEditButton(row, id) {
	
		var cancelEditButton=createButton("Cancel","cancelEdit("+id+")");
               
        var data=document.createElement("td");
        row.appendChild(data);
        data.appendChild(cancelEditButton);
		
	}
	
	function getEmployee(id) {
	
		for(var i=0;i<employees.length;i++)
			if(employees[i].id===id)
				return employees[i];
	     
		return null;
		
    }
	
	function cancelEdit(id) {
	
		row=document.getElementById(id);
		tds=row.childNodes;
		var employee=getEmployee(id);
		var values=[employee.nume,employee.prenume,employee.varsta,employee.departament,employee.link];
		
		for(var i=0;i<tds.length-2;i++) {
		
		    var td=tds[i];
			td.removeChild(td.childNodes[0]);
			td.innerHTML=values[i];
			
		}
		
		row.removeChild(row.childNodes[5]);
		row.removeChild(row.childNodes[5]);
		
		addEditButton(row,id);
		addDeleteButton(row,id);
	
	}
	
    function addNewEmployee() {
     
	    maxId=maxId+1;
		var id=maxId;

		document.getElementById("addButton").disabled=true;
		
		var table=document.getElementsByTagName("tbody")[0];
        var row=document.createElement("tr");
        row.setAttribute("id",id);
		       
        var form=document.createElement("form");
        table.appendChild(form);
        table.appendChild(row);
                
        for(var i=0;i<5;i++) {
                
            var data=document.createElement("td");
            var input=document.createElement("input");
            input.setAttribute("type","text");
                        
            row.appendChild(data);
            data.appendChild(input);
                        
        }
                
        addSaveButton(row,id);
		addCancelAddButton(row,id);
    }
	