
var usersDirectory = [];    // array to store all users objects 
var filteredEmployee=[]     //storing filted employee to display
var activeDirectory;       //stores object of active employee
var employeeContact;        //stores id of active employee
var hasEmployee;            // storing count of acive filter employee

var entityObject = {
    departmentList:['IT','Human Resources','MD'],
    officeList:['Seattle','India'],
    jobTitleList:['SharePoint Practice Head','.Net Development Lead','Recruiting Expert','BI Developer','Business Analyst','Full Stack Developer','Azure Lead','React Development Lead']
};

if (!getEntity()|| getEntity().length === 0) {
    updateEntity();
  }
  
entityObject = getEntity();
initializeDirectorys()
initializeFilters()
noEmployeePresent();
getCountOfEmployee();
ifListOverflow();
createCharacterFilter()
// Call the function to load all select options from localstorage
populateOptions('inputDepartment', entityObject.departmentList);
populateOptions('inputjobTitle', entityObject.jobTitleList);
populateOptions('inputOffice', entityObject.officeList);


//creates global unique id and returns 16 bit ID;
function randomString() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateGuid() {
    return (randomString() + randomString() + "-" + randomString() + "-4" + randomString().slice(0, 3) + "-" + randomString() + "-" + randomString() + randomString() + randomString()).toLowerCase();
}

// creates employee cards by taking data from local storage
function initializeDirectorys() {
    let StoredDirecotry = getDirectorys();
    if (StoredDirecotry) {
        usersDirectory = JSON.parse(StoredDirecotry);
        for (var i = 0; i < usersDirectory.length; i++) {
            createEmployee(usersDirectory[i]);
        }
    }
}

//function to create chracter filter list
function createCharacterFilter(){
   let list= getElement('filterByLetter');
    for(var i = 65 ; i<= 90; i++){
        let item = document.createElement('li');
            item.setAttribute('class','chracter-style');
            item.setAttribute('onclick', "searchEmployee('', '" + String.fromCharCode(i) + "', this)");
            item.innerHTML=String.fromCharCode(i);
            list.appendChild(item);
    } 
}

//function to display warning if employees not present
function noEmployeePresent() {
    usersDirectory.length == 0 ? displayNoContactFound('No employee present') : displayNoContactFound('');
}

//takes data from form create object of employee and append it to usersDirectory array
function addEmployee(e) {
    e.preventDefault();
    if (validateInput() && validateUser()) {
        let newUserData = getEmployee();

        var formData = {
            id: generateGuid(),
            firstName: newUserData.elements['firstName'].value,
            lastName: newUserData.elements['lastName'].value,
            gender: newUserData.elements['inlineRadioOptions'].value,
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
        getCountOfEmployee()
        noEmployeePresent();
        hideModal();
        getEmployee().reset();
    }
}

// cretes employee card with all information taken from form.
function createEmployee(formData) {

    var id = document.createElement('div');
    id.setAttribute('id', formData.id);
    id.setAttribute('class', 'employee-directory user-contact');
    id.setAttribute('onclick', 'activeEmployee(this)');
    id.setAttribute('data-target', "#formModal");
    id.setAttribute('data-toggle', "modal");

    var row = document.createElement('div');
    row.setAttribute('class', 'row p-2 m-0');

    insertElement(id, row);

    var leftCol = document.createElement('div');
    leftCol.setAttribute('class', 'col col-sm-4 pl-0 pr-0');
    var img = document.createElement('img');
    img.setAttribute('class', 'employee-image');
    img.setAttribute('src', '/resources/images/profile.jpg');

    insertElement(leftCol, img);
    insertElement(row, leftCol);

    var rightCol = document.createElement('div');
    rightCol.setAttribute('class', 'col col-sm-8 pr-0 pl-1');
    rightCol.setAttribute('id', 'userDirectory');
    insertElement(row, rightCol);

    var name = document.createElement('div');
    name.setAttribute('class', 'font-weight-bold employee-name employee-contact');
    name.innerText = formData.firstName + " " + formData.lastName
    insertElement(rightCol, name);

    var position = document.createElement('div');
    position.setAttribute('class', 'text-muted employee-contact');
    position.innerText = formData.jobTitle
    insertElement(rightCol, position);

    var department = document.createElement('div');
    department.setAttribute('class', 'text-muted employee-contact');
    department.innerText = formData.department;
    insertElement(rightCol, department);

    var icons = document.createElement('div');
    icons.innerHTML = '<i class="bi bi-telephone-fill icon-color"> </i> <i class="bi bi-envelope-fill icon-color"> </i> <i class="bi bi-chat-fill icon-color"> </i> <i class="bi bi-star-fill icon-color"> </i> <i class="bi bi-suit-heart-fill icon-color"> </i> ';
    insertElement(rightCol, icons);
    insertElement(getElement('employeeDirectorySection'), id);
}

//function to cancel update operation
function cancelUpdate() {
    getElement('addEmployeeForm').reset();
    getElement('entityForm').reset();
    setInnerHtmlEmpty(getByClassName('errorStyle'));
}

//function to display and hide update delete and cancel button
function formOptions(value) {
    getElement('FormTitle').innerHTML = value ? "Add Contact" : "Edit Contact";
    setUpdateAndDeleteButtons(true);
    toogleEditButton(!value);
    editForm(value);
}

//when click on employee card display all details in form 
function activeEmployee(employee) {
    employeeContact = employee;
    let user;
    for (let i = 0; i < usersDirectory.length; i++) {
        if (usersDirectory[i].id === employee.id) {
            activeDirectory = usersDirectory[i];
            user = usersDirectory[i];
            break;
        }
    } 
    readOnly();
    disableSelect();
    showDirectory(user);
    setUpdateAndDeleteButtons(false);
    toggleButtonAttribute(false);
}

//display employee data in form
function showDirectory(empContact) {
    setInnerHtmlEmpty(getByClassName('errorStyle'));
    formOptions(false);
    let newUserData = getEmployee();
    newUserData.elements['firstName'].value = empContact.firstName;
    newUserData.elements['lastName'].value = empContact.lastName;
    newUserData.elements['preferedName'].value=empContact.firstName +" "+ empContact.lastName;
    newUserData.elements['inlineRadioOptions'].value = empContact.gender;
    newUserData.elements['email'].value = empContact.email;
    newUserData.elements['mobile'].value = empContact.mobile;
    newUserData.elements['office'].value = empContact.office;
    newUserData.elements['department'].value = empContact.department;
    newUserData.elements['jobTitle'].value = empContact.jobTitle;
    newUserData.elements['skype'].value = empContact.skype;
}

//updates current employee directory
function updateEmployeeDirectory() {

    if (validateInput() && validateUser()) {
        let newUserData = getEmployee();
        activeDirectory.firstName = newUserData.elements['firstName'].value
        activeDirectory.lastName = newUserData.elements['lastName'].value
        activeDirectory.gender = newUserData.elements['inlineRadioOptions'].value
        activeDirectory.email = newUserData.elements['email'].value
        activeDirectory.mobile = newUserData.elements['mobile'].value
        activeDirectory.office = newUserData.elements['office'].value
        activeDirectory.department = newUserData.elements['department'].value
        activeDirectory.jobTitle = newUserData.elements['jobTitle'].value
        activeDirectory.skype = newUserData.elements['skype'].value

        let activeDirectoryId = activeDirectory.id;
        let userContact = getElement(activeDirectoryId).querySelectorAll('.employee-contact');

        userContact[0].innerHTML = activeDirectory.firstName + ' ' + activeDirectory.lastName;
        userContact[1].innerHTML = activeDirectory.jobTitle;
        userContact[2].innerHTML = activeDirectory.department;

        updateDirectory();
        getCountOfEmployee();
        hideModal();
        getEmployee().reset();
    }
}

//function to hide and show jobTitle options  make list dynamic and count for list item
function ifListOverflow(){
      var jobTitleList =  getElement('jobTitleList').querySelectorAll('li');
           if(jobTitleList.length >=5){
                hideList();
       }
}

var toogle =true;
//toogle show more and show less link
function toggleList(isValid){
    
        if(toogle){
            getElement('showMore').innerHTML='Show less';
            showList();
        }else{
            getElement('showMore').innerHTML='Show more';
            hideList();
        }
}

// function to display overflowing list
function showList(){
    var jobTitleList =  getElement('jobTitleList').querySelectorAll('li');
    for(let i =5; i<jobTitleList.length ;i++){
    setDisplayBlock(jobTitleList[i]);
        toogle =false;
    }      
}

//function to hide  overflowing list
function hideList(){
    var jobTitleList =  getElement('jobTitleList').querySelectorAll('li');
    for(let i =5; i<jobTitleList.length ;i++){
        setDisplayNone(jobTitleList[i]);
    }
    toogle =true;
}

//Deletes employee Directory
function deleteDirectory() {
    usersDirectory = usersDirectory.filter(user => user.id !== employeeContact.id);
    updateDirectory();
    employeeContact.remove();
    getCountOfEmployee();
    hideModal();
    getEmployee().reset();
    noEmployeePresent();
    isEmployee();
}

//function to populate form slect options based on total available options in object array
function populateOptions(selectId, list) {
    var selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';
    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select ' + selectId.charAt(5).toLowerCase() + selectId.slice(6);
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    for (var i = 0; i < list.length; i++) {
        var option = document.createElement('option');
        option.value = list[i];
        option.text = list[i];
        selectElement.appendChild(option);
    }
}

//functoin to search employee by alphabet and selected options
function searchEmployee(input, letter,isElement) {

    //letter is value for searching letters
    // input is search based on input entered value

    if(typeof(isElement) !== 'string'){
        setActive(isElement,'chracter');
    }

    var searchBy = getSearchOption();
    var count = 0;
    letter === '' ? count = searchUsingOptions(count, searchBy, input) : count = searchUsingAlphabet(letter);
    count <= 0 ? displayNoContactFound('No employee found..!!') : displayNoContactFound('');

}

//remove existing employee from screen
function clearEmployee(){
    getElement('employeeDirectorySection').innerHTML=''
}


//function to search employee using selected search option
function searchUsingOptions(cont, searchBy, employee) {

    let filter
    if(typeof(employee) === 'string'){
        filter = employee.toLowerCase();
    }else{
            filter = employee.value.toLowerCase();
    }
    
    let count = cont;

    switch (searchBy) {
        case 'name':
            clearEmployee();
            filteredEmployee = usersDirectory.filter(user => user.firstName.toLowerCase().indexOf(filter) > -1)
           count= showFilteredEmployee(filteredEmployee); 
            break;

        case 'department':

            clearEmployee();
            filteredEmployee = usersDirectory.filter(user => user.department.toLowerCase().indexOf(filter) > -1)
            count = showFilteredEmployee(filteredEmployee);
            break;

        case 'jobtitle':

            clearEmployee();
            filteredEmployee = usersDirectory.filter(user => user.jobTitle.toLowerCase().indexOf(filter) > -1)
            count = showFilteredEmployee(filteredEmployee)
            break;

        case 'office':
            clearEmployee();
            filteredEmployee = usersDirectory.filter(user => user.office.toLowerCase().indexOf(filter) > -1)
            count = showFilteredEmployee(filteredEmployee)
            break;
    }

    return count;
}

//function to search employee whose name start with specific Alphabet
function searchUsingAlphabet(letter) {

    clearEmployee();
    filteredEmployee = usersDirectory.filter(user => user.firstName.charAt(0).toLowerCase() === letter.toLowerCase())
    return showFilteredEmployee(filteredEmployee);
 
};


//function to show filted employee
function showFilteredEmployee(employee){
    for(let emp of employee){
        createEmployee(emp);
    }

    return employee.length
}

//function to get count of employees based on jobTitle , department, and office
function getCountOfEmployee() {

    for (let i = 0; i < entityObject.departmentList.length; i++) {
        departmentCount[i] = usersDirectory.filter(user => user.department.toLowerCase() === departments[i].toLowerCase());
    }

    for (let i = 0; i < entityObject.officeList.length; i++) {
        officesCount[i] = usersDirectory.filter(user => user.office.toLowerCase() === offices[i].toLowerCase());
    }

    for (let i = 0; i < entityObject.jobTitleList.length; i++) {
        jobTitlesCount[i] = usersDirectory.filter(user => user.jobTitle.toLowerCase() === jobTitles[i].toLowerCase());
    }

     displayDepartmentCount();
}

//display the current count of employees based on department , office and jobTitle
function displayDepartmentCount() {

    let department = getByClassName('department');
    for (let i = 0; i < entityObject.departmentList.length; i++) {
        department[i].innerHTML = departmentCount[i].length;
    }

    let offices = getByClassName('office');
    for (let i = 0; i < entityObject.officeList.length; i++) {
        offices[i].innerHTML = officesCount[i].length;
    }

    let jobTitles = getByClassName('jobTitle');
    for (let i = 0; i < entityObject.jobTitleList.length; i++) {
        jobTitles[i].innerHTML = jobTitlesCount[i].length;
    }
}

function isEmployee(){
    
    if(hasEmployee.innerHTML <= 0){
        displayNoContactFound('No employee present');
    }
}

//function set active filter background
function setActive(activeFilter ,isString){

        var list;
    if(isString ===''){
         list= getElement('filterLeftSection').querySelectorAll('li');
    }else{
        list = getElement('filterByLetter').querySelectorAll('li');
    }

        for(let li of list){
            li.style.backgroundColor='';
            li.style.color='';
        }
        hasEmployee = activeFilter.querySelector('span');

        activeFilter.style.backgroundColor='lightGray';
        activeFilter.style.color='white';
}

//filtering the employees based on jobTtitle , office and department
function findEmployeeByDepartment(department, subDepartment, activeFilter) {

   let count =0;

   count = searchUsingOptions(count, department, subDepartment);

   count <= 0 ? displayNoContactFound('No employee found..!!') : displayNoContactFound('');

   setActive(activeFilter,''); // set current filter background color and also used to find if no employee present display no employee warning

}

//function to remove text from search input 
function clearSearch() {
    getElement('searchEmployee').value = '';
    clearEmployee();
    getElement('noContactFound').innerHTML=''
    resetFilters()
    initializeDirectorys();
}

//disabling and hiding delete update buttons in modal pop-up
function confirmChange(option) {

    option === 'update' ? getElement('modalHeding').innerHTML = 'Update Address' : getElement('modalHeding').innerHTML = 'Delete Address'

    var button = getElement('confirmUpdate');;
   if(option ==='update'){
        button.setAttribute('onclick','updateEmployeeDirectory(event)');
        button.innerHTML='Update';
   }else{
            button.setAttribute('onclick','deleteDirectory()');
            button.innerHTML='Delete';
   }
}

function toggleButtonAttribute(isValid){
    let button =  getElement('deleteButton');
    if(isValid){
        button.setAttribute('onclick','confirmChange("update")');
        button.innerHTML='Update'
    }else{
        button.setAttribute('onclick','confirmChange("delete")');
        button.innerHTML='Delete'
    }
     
}

//enables form filed to be edited
function editForm(isValid) {
    if (isValid) {
        enableSelect();
        toggleButtonAttribute(true);
        var employeeForm = getEmployee();
        var inputFields = employeeForm.querySelectorAll('input');
        inputFields.forEach(function (fileds) {
            fileds.removeAttribute('disabled');
        })
    }
}

//make form fields readonly
function readOnly() {
    var employeeForm = getEmployee();
    var inputFields = employeeForm.querySelectorAll('input');
    inputFields.forEach(function (field) {
        field.disabled = 'disabled';
    });
}

//function to make fields editable , remove readonly 
function toogleEditButton(isValid) {
    var editButton = getElement('editButton');
    isValid ? editButton.removeAttribute('data-dismiss', 'modal') : editButton.setAttribute('data-dismiss', 'modal');
    isValid ? editButton.innerHTML = 'Edit' : editButton.innerHTML = 'Cancel';
    isValid ? editButton.setAttribute('onclick', 'editForm(true)') : editButton.setAttribute('onclick', 'cancelUpdate(event)');
}

//disable input select
function disableSelect() {
    var selectElement = getEmployee().querySelectorAll('select');
    selectElement.forEach(element => {
        element.setAttribute('disabled','disabled');
    });
}

function enableSelect() {
    var selectElement = getEmployee().querySelectorAll('select');
    selectElement.forEach(element => {
        element.removeAttribute('disabled','disabled');
    });
}

//function to display employees in asending order based on selected entity
function filterBySelect(selected){
    clearEmployee();
    var sortedArray = usersDirectory;

    filterBy = selected.value; // value of selected may be department, office or jobTitle or firstName

    sortedArray.sort((a, b) => {
        var fieldA
        var fieldB
        switch(filterBy){
            case 'name':
             fieldA = a.firstName.toLowerCase();
             fieldB = b.firstName.toLowerCase();
             break;

             case 'office':
                fieldA = a.office.toLowerCase();
                fieldB = b.office.toLowerCase();
                break;
            
             case 'jobTitle':
             fieldA = a.jobTitle.toLowerCase();
             fieldB = b.jobTitle.toLowerCase();
             break;

             case 'department':
             fieldA = a.department.toLowerCase();
             fieldB = b.department.toLowerCase();
             break;
        }

        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0;
      });

      sortedArray.forEach(element => {
        createEmployee(element);
      });
}   
      
// event listener added to Entity select in Add entity form based on selection options in bottom select will load
       getElement('selectEntity').addEventListener('change', function() {
        var selectedEntity = this.value;
        var options = entityOptions[selectedEntity] || [];
    
        var entityTypeSelect = getElement('entityType');
        entityTypeSelect.innerHTML = ''; 
    
        options.forEach(function(value) {
            var option = document.createElement('option');
            option.value = value;
            option.text = value;
            entityTypeSelect.appendChild(option);
        });
    });

//adding new entity or option inside entity
    function addFilter(){
        
            var entity = getElement('selectEntity').value;
            var entityType=getElement('entityType').value;

             switch(entity){

                case 'department':
                    var isValid = entityObject.departmentList.filter(user => user.toLowerCase() === entityType.toLowerCase());
                    if(isValid.length <= 0){
                        createFilter(entity, entityType);
                        entityObject.departmentList.push(entityType);
                        updateEntity();
                    }
                    break;

                case 'office':
                    var isValid = entityObject.officeList.filter(user => user.toLowerCase() === entityType.toLowerCase());
                    if(isValid.length <= 0){
                        createFilter(entity, entityType);
                        entityObject.officeList.push(entityType);
                        updateEntity();
                    }
                    break;

                case 'jobTitle':
                    var isValid = entityObject.jobTitleList.filter(user => user.toLowerCase() === entityType.toLowerCase());
                    if(isValid.length <= 0){
                        createFilter(entity, entityType);
                        entityObject.jobTitleList.push(entityType);
                         updateEntity();
                    }    
                    break;
            }
            getCountOfEmployee();

            populateOptions('inputDepartment', entityObject.departmentList);
            populateOptions('inputjobTitle', entityObject.jobTitleList);
            populateOptions('inputOffice', entityObject.officeList);
    }

    //create new option inside entity
function createFilter(entity, entityType) {
    var li = document.createElement('li');
    li.setAttribute('onclick', `findEmployeeByDepartment('${entity.toLowerCase()}', '${entityType}' , this)`);
    li.setAttribute('value', entityType);
    li.innerHTML = `${entityType} (<span id='${entityType.toLowerCase()}Count' class='${entity}'></span>)`;
    getElement(entity+'List').appendChild(li);
}

// Loop through the entityObject and call createFilter for each array
function initializeFilters(){
    for (var entity in entityObject) {
        if (entityObject.hasOwnProperty(entity)) {  // returns true if element is direct property of object
            var entityType = entity.substring(0, entity.length - 4); // Remove "List" from the entity name
            entityObject[entity].forEach(function(item) {
                createFilter( entityType, item);
            });
        }
    }
}

function resetFilters() {
    let leftFilters = getElement('filterLeftSection').querySelectorAll('li');
    let letterFilters = getElement('filterByLetter').querySelectorAll('li');

    for (let li of leftFilters) {
        li.style.backgroundColor = '';
        li.style.color = '';
    }

    for (let li of letterFilters) {
        li.style.backgroundColor = '';
        li.style.color = '';
    }
}


