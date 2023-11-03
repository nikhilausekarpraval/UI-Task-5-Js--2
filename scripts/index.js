    
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

      getCountOfEmployee();

    function toggleHidden() {
        var hiddenItems = document.querySelectorAll('.hidden');
        hiddenItems.forEach(function (item) {
            item.style.display = (item.style.display === 'none' || item.style.display === 'block') ? 'list-item' : 'none';
        });
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
    value ? setDisplayBlock(getElement("submitButton")) : setDisplayNone(getElement("submitButton"));
    value ? setDisplayNone(getElement("updateButton")) : setDisplayBlock(getElement("updateButton"));
    value ? setDisplayNone(getElement("deleteButton")) : setDisplayBlock(getElement("deleteButton"));
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
    let newUserData = getEmployee();

    activeDirectory.firstName  = newUserData.elements['firstName'].value 
    activeDirectory.lastName  = newUserData.elements['lastName'].value 
    activeDirectory.email  = newUserData.elements['email'].value 
    activeDirectory.mobile  = newUserData.elements['mobile'].value 
    activeDirectory.office = newUserData.elements['office'].value 
    activeDirectory.department = newUserData.elements['department'].value
    activeDirectory.jobTitle  = newUserData.elements['jobTitle'].value
    activeDirectory.skype =  newUserData.elements['skype'].value 

    let activeDirectoryId = activeDirectory.id;
    let userContact = getElement(activeDirectoryId).querySelectorAll('.employee-contact');

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

   function clearSearch(){
            getElement('searchEmployee').value='';
   }

   //search baed on options
   function getSearchOption(){
    var selectBox = getElement('searchOptions')//gettting this option by getElemetnby id 
    return selectBox.value;
   }

   function searchEmployee(employee){
    var searchBy = getSearchOption();
    var compareWith = employee.value.toUpperCase();
    var objectId, object,fullName ,count=0;

    for(let i =0 ;i <usersDirectory.length;i++){
         objectId=   usersDirectory[i].id 
         object = usersDirectory[i];

         var fullName = object.firstName.toUpperCase() + " " + object.lastName.toUpperCase();
         switch (searchBy) {
            case 'name':
                if(fullName.indexOf(compareWith) > -1 ){
                    display(objectId); count++;
                }else{
                    hide(objectId)
                }
                break;
            case 'department':
            case 'jobTitle':
            case 'office':
                if(object[searchBy].toUpperCase().indexOf(compareWith) > -1 ){
                    display(objectId);
                    count++
                }else{
                    hide(objectId);
                }
                 break;
        }
    }
            count <= 0 ?displayNoContactFound('No such employee found..!!') : displayNoContactFound('');
}

   function hide(elementId){
        var empList = getByClassName('employee-block');  //getting this block by class name custom function
        for(let i =0 ;i<empList.length;i++){
                    if(empList[i].id === elementId){
                        empList[i].style.display ='none';
                        break;
             }
        }
   }

   function display(elementId){
    var empList = getByClassName('employee-block');  //getting this block by class name custom function
    for(let i =0 ;i<empList.length;i++){
                if(empList[i].id === elementId){
                    empList[i].style.display ='block';
                    break;
         }
    }
}

function searchByAlphabet(letter){
    var compareWith = letter.toUpperCase();
    var objectId, object,nameChar;
    var count =0;
    for(let i =0 ;i <usersDirectory.length;i++){
         objectId=   usersDirectory[i].id 
         object = usersDirectory[i];

         var empName = object.firstName.toUpperCase();
              nameChar = empName.charAt(0);
              if(nameChar === compareWith){
                count++;
                display(objectId)
                
              }else{
                hide(objectId);
         }

    }
       count<=0 ? displayNoContactFound('No employee name start with that letter..!!') : displayNoContactFound(''); 
}

function displayNoContactFound(message){
        element = getElement('noContactFound').innerHTML = message;
}


 function getCountOfEmployee(){

    for(let i =0 ; i<departments.length ;i++){
        departmentCount[i] = usersDirectory.filter(user => user.department.toUpperCase() === departments[i].toUpperCase());
    }

    for(let i =0 ; i<offices.length; i++){
        officesCount[i] = usersDirectory.filter(user => user.office.toUpperCase() === offices[i].toUpperCase());
    }

    for(let i =0 ; i<jobTitles.length;i++){
        jobTitlesCount[i] = usersDirectory.filter(user => user.jobTitle.toUpperCase() === jobTitles[i].toUpperCase());
    }

    displayDepartmentCount();

    }

    function displayDepartmentCount(){
   
       let department = getByClassName('departments');
           for(let i =0 ; i<departments.length;i++){
                    department[i].innerHTML = departmentCount[i].length;
           }

           let offices = getByClassName('offices');
           for(let i =0 ; i<offices.length;i++){
                 offices[i].innerHTML = officesCount[i].length;
           }

           let jobTitles = getByClassName('job-titles');
           for(let i =0 ; i<jobTitles.length;i++){
                     jobTitles[i].innerHTML = jobTitlesCount[i].length;
           }
     }