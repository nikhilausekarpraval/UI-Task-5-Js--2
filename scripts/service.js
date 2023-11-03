
//get address from local storage
function getDirectorys() {
    return localStorage.getItem('employeeDirectory');
  }
  
  //update address in local storage
  function updateDirectory() {
    localStorage.setItem('employeeDirectory', JSON.stringify(usersDirectory));
  }