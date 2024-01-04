//get address from local storage
function getDirectorys() : string | null {
    return localStorage.getItem('employeeDirectory');
}
  
//update address in local storage
function updateDirectory() : void {
    localStorage.setItem('employeeDirectory', JSON.stringify(usersDirectory));
}

//function to update Entity object in local storage
function getEntity(): any {
    const recivedEntity = localStorage.getItem('entity');
    var json ;
    if(recivedEntity)
    json = JSON.parse(recivedEntity);
    return json;
}
  
//update address in local storage
function updateEntity() : void{
    localStorage.setItem('entity', JSON.stringify(entityObject));
    
}

