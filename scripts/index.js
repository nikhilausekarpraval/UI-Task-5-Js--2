    
    var usersDirectory = [];
    var activeDirectory ;
    var employeeContact;

    initializeDirectorys()


function generateGuid() {
    function str() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (str() + str() + "-" + str() + "-4" + str().slice(0, 3) + "-" + str() + "-" + str() + str() + str()).toLowerCase();
    }

    function initializeDirectorys() {
        const StoredDirecotry = getDirectorys();
        if (StoredDirecotry) {
            usersDirectory = JSON.parse(StoredDirecotry);
            for(var i=0; i<usersDirectory.length; i++){     
                createEmployee(usersDirectory[i]);   
            }   
            // hideNoAddress();
        }
      }

    function toggleHidden() {
        var hiddenItems = document.querySelectorAll('.hidden');
        hiddenItems.forEach(function (item) {
            item.style.display = (item.style.display === 'none' || item.style.display === 'block') ? 'list-item' : 'none';
        });
    }

    function getElement(element) {
        return document.getElementById(element);
    }

    function getEmployee() { 
        return getElement("myForm");
    }


function addEmployee(e){
        e.preventDefault();
//    if (validateInput() && validateUser()) {
    let newUserData = getEmployee();
    var formData = {
      id: generateGuid(),
      firstName: newUserData.elements['firstName'].value,
      lastName: newUserData.elements['lastName'].value,
      email: newUserData.elements['email'].value,
      mobile: newUserData.elements['mobile'].value,
      jobTitle: newUserData.elements['jobTitle'].value,
      office: newUserData.elements['office'].value,
      department: newUserData.elements['department'].value,
      skype: newUserData.elements['skype'].value
    };
    usersDirectory.push(formData);
    updateDirectory()
    createEmployee(formData);
    // hideNoAddress();
       myForm.reset();
  }

  function createEmployee(formData){

    var id = document.createElement('div');
        id.setAttribute('id',formData.id);
        id.setAttribute('class','employee-block user-contact');
        id.setAttribute('onclick','activeEmployee(this)');
        id.setAttribute('data-target',"#formModal");
        id.setAttribute('data-toggle',"modal");

        var row = document.createElement('div');
        row.setAttribute('class','row p-2');

        insertElement(id,row);

    var leftCol = document.createElement('div');
        leftCol.setAttribute('class','col col-sm-4 pl-3 pr-0');
    var img = document.createElement('img');
        img.setAttribute('class','employee-image');
        img.setAttribute('src','/resources/images/profile.jpg');

        insertElement(leftCol,img);
        insertElement(row,leftCol);

    var rightCol = document.createElement('div');
        rightCol.setAttribute('class','col col-sm-8 pr-0 pl-2');
        rightCol.setAttribute('id','userDirectory');
        insertElement(row,rightCol);

    var name = document.createElement('div');
        name.setAttribute('class','font-weight-bold employee-name employee-contact' );
        name.innerText=formData.firstName + " "+ formData.lastName
        insertElement(rightCol,name);

    var position = document.createElement('div');
        position.setAttribute('class','text-muted employee-contact');
        position.innerText = formData.jobTitle
        insertElement(rightCol,position);

    var department = document.createElement('div');
        department.setAttribute('class','text-muted employee-contact');
        department.innerText = formData.department;
        insertElement(rightCol,department);

    var icons = document.createElement('div');
        icons.innerHTML= '<i class="bi bi-telephone-fill icon-color"> </i> <i class="bi bi-envelope-fill icon-color"> </i> <i class="bi bi-chat-fill icon-color"> </i> <i class="bi bi-star-fill icon-color"> </i> <i class="bi bi-suit-heart-fill icon-color"> </i> ';
        insertElement(rightCol,icons);
        insertElement(getElement('employeeDirectorySection'), id);         
  }

  function cancelUpdate(event) {
    event.preventDefault();
    myForm.reset();
    setInnerHtmlEmpty(getByClassName('errorStyle'));
  }

  function formOptions(value) {
    getElement('FormTitle').innerHTML = value ? "Add Contact" : "Edit Contact";
    getElement("submitButton").style.display = value ? "block" : "none";
    getElement("updateButton").style.display = value ? "none" : "block";
    getElement("deleteButton").style.display = value ? "none" : "block";
  }


  function activeEmployee(employee){
    employeeContact = employee;      
        let user;
    for(  let i =0 ; i < usersDirectory.length; i++){
            if(usersDirectory[i].id === employee.id){
                activeDirectory =usersDirectory[i];
                user =usersDirectory[i];
                break;
            }    
    }
        showDirectory(user);
  }

   function showDirectory(empContact){
    setInnerHtmlEmpty(getByClassName('errorStyle'));
    formOptions(false);

    let newUserData = getEmployee();

    newUserData.elements['firstName'].value = empContact.firstName;
    newUserData.elements['lastName'].value = empContact.lastName;
    newUserData.elements['email'].value = empContact.email;
    newUserData.elements['mobile'].value = empContact.mobile;
    newUserData.elements['office'].value = empContact.office;
    newUserData.elements['department'].value = empContact.department;
    newUserData.elements['jobTitle'].value = empContact.jobTitle;
    newUserData.elements['skype'].value = empContact.skype;
   }

   function updateDirecotry(){
    let newUserData = getEmployee('');

    activeDirectory.firstName  = newUserData.elements['firstName'].value 
    activeDirectory.lastName  = newUserData.elements['lastName'].value 
    activeDirectory.email  = newUserData.elements['email'].value 
    activeDirectory.mobile  = newUserData.elements['mobile'].value 
    activeDirectory.office = newUserData.elements['office'].value 
    activeDirectory.department = newUserData.elements['department'].value
    activeDirectory.jobTitle  = newUserData.elements['jobTitle'].value
    activeDirectory.skype =  newUserData.elements['skype'].value 

    let userContact = getByClassName('employee-contact');

    userContact[0].innerHTML = activeDirectory.firstName +' '+activeDirectory.lastName;
    userContact[1].innerHTML = activeDirectory.jobTitle;
    userContact[2].innerHTML = activeDirectory.department;
    updateDirectory()
    myForm.reset();

   }

   function deleteDirectory(){
     usersDirectory = usersDirectory.filter(user => user.id !== employeeContact.id);
     updateDirectory()
      employeeContact.remove();
      myForm.reset();
    //   hideNoAddress();
   }