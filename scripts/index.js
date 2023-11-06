
var usersDirectory = [];    // array to store all users objects 
var activeDirectory;       //stores object of active employee
var employeeContact;        //stores id of active employee

initializeDirectorys()
NoEmployeesFound();
getCountOfEmployee();

//creates global unique id and returns 16 bit ID;
function generateGuid() {
    function str() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (str() + str() + "-" + str() + "-4" + str().slice(0, 3) + "-" + str() + "-" + str() + str() + str()).toLowerCase();
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

//function to hide and show jobTitle options
function toggleHidden() {
    var hiddenItems = document.querySelectorAll('.hidden');
    hiddenItems.forEach(function (item) {
        item.style.display = (item.style.display === 'none' || item.style.display === 'block') ? 'list-item' : 'none';
    });
}

//function to display warning if employees not present
function NoEmployeesFound() {
    getElement('employeeDirectorySection').length == 0 ? displayNoContactFound('No employee present') : displayNoContactFound('');
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
        NoEmployeesFound();
        hideModal();
        myForm.reset();
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
    leftCol.setAttribute('class', 'col col-sm-4 pl-1 pr-0');
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
function cancelUpdate(event) {
    event.preventDefault();
    myForm.reset();
    setInnerHtmlEmpty(getByClassName('errorStyle'));
}

//function to display and hide update delete and cancel button
function formOptions(value) {
    getElement('FormTitle').innerHTML = value ? "Add Contact" : "Edit Contact";
    toogleEditButton(!value);
    editForm(value);
    value ? setDisplayBlock(getElement("submitButton")) : setDisplayNone(getElement("submitButton"));
    value ? setDisplayNone(getElement("updateButton")) : setDisplayNone(getElement("updateButton"))
    value ? setDisplayNone(getElement("deleteButton")) : setDisplayBlock(getElement("deleteButton"));
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
    } readOnly();
    disableFields();

    showDirectory(user);
}

//display employee data in form
function showDirectory(empContact) {

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

//updates current employee directory
function updateDirecotry() {

    if (validateInput() && validateUser()) {
        let newUserData = getEmployee();

        activeDirectory.firstName = newUserData.elements['firstName'].value
        activeDirectory.lastName = newUserData.elements['lastName'].value
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

        updateDirectory()
        getCountOfEmployee()
        hideModal()
        myForm.reset();
    }
}

//Deletes employee Directory
function deleteDirectory() {
    usersDirectory = usersDirectory.filter(user => user.id !== employeeContact.id);
    updateDirectory()
    employeeContact.remove();
    getCountOfEmployee()
    hideModal()
    myForm.reset();
    NoEmployeesFound()
}

//functoin to search employee by alphabet and selected options
function searchEmployee(employee, letter) {

    var searchBy = getSearchOption();
    var objectId, object, fullName, count = 0;

    for (let i = 0; i < usersDirectory.length; i++) {
        objectId = usersDirectory[i].id
        object = usersDirectory[i];

        var empName = object.firstName.toUpperCase();
        var fullName = object.firstName.toUpperCase() + " " + object.lastName.toUpperCase();

        letter === '' ? count = searchUsingOptions(count, fullName, searchBy, employee, objectId, object) : count = searchUsingAlphabet(count, letter, empName, objectId);

    }
    count <= 0 ? displayNoContactFound('No such employee found..!!') : displayNoContactFound('');
}

//function to hide the employee card
function hide(elementId) {
    var empList = getEmployeeCards();  //getting this employee card by class name 
 for (let i = 0; i < empList.length; i++) {
        if (empList[i].id === elementId) {
            empList[i].style.display = 'none';
            break;
        }
    }
}

// function to display employee card
function display(elementId) {
    var empList = getEmployeeCards(); //getting this employee card by class name 
    for (let i = 0; i < empList.length; i++) {
        if (empList[i].id === elementId) {
            empList[i].style.display = 'block';
            break;
        }
    }
}

//function to search employee using selected search option
function searchUsingOptions(cont, fullName, searchBy, employee, objectId, object) {
    let count = cont;
    var compareWith = employee.value.toUpperCase();
    switch (searchBy) {
        case 'name':
            if (fullName.indexOf(compareWith) > -1) {
                display(objectId);
                count++;
            } else {
                hide(objectId);
            }
            break;
        case 'department':
        case 'jobTitle':
        case 'office':
            if (object[searchBy].toUpperCase().indexOf(compareWith) > -1) {
                count++;
                display(objectId);
            } else {
                hide(objectId);

            }
            break;
    }
    return count;
}

//function to search employee whose name start with specific Alphabet
function searchUsingAlphabet(cont, letter, empName, objectId) {
    let count = cont;
    var compareWith = letter.toUpperCase();
    let nameChar = empName.charAt(0);
    if (nameChar === compareWith) {
        count++;
        display(objectId)
    } else {
        hide(objectId);
    }
    return count;
};

//function to get count of employees based on jobTitle , department, and office
function getCountOfEmployee() {

    for (let i = 0; i < departments.length; i++) {
        departmentCount[i] = usersDirectory.filter(user => user.department.toUpperCase() === departments[i].toUpperCase());
    }

    for (let i = 0; i < offices.length; i++) {
        officesCount[i] = usersDirectory.filter(user => user.office.toUpperCase() === offices[i].toUpperCase());
    }

    for (let i = 0; i < jobTitles.length; i++) {
        jobTitlesCount[i] = usersDirectory.filter(user => user.jobTitle.toUpperCase() === jobTitles[i].toUpperCase());
    }

    displayDepartmentCount();
}

//display the current count of employees based on department , office and jobTitle
function displayDepartmentCount() {

    let department = getByClassName('departments');
    for (let i = 0; i < departments.length; i++) {
        department[i].innerHTML = departmentCount[i].length;
    }

    let offices = getByClassName('offices');
    for (let i = 0; i < offices.length; i++) {
        offices[i].innerHTML = officesCount[i].length;
    }

    let jobTitles = getByClassName('job-titles');
    for (let i = 0; i < jobTitles.length; i++) {
        jobTitles[i].innerHTML = jobTitlesCount[i].length;
    }
}

//filtering the employees based on jobTtitle , office and department
function findEmployeeByDepartment(department, subDepartment) {
    subDepartment = subDepartment.trim();
    let count = 0;
    usersDirectory.forEach(user => {
        switch (department) {
            case 'department':
                if (user.department.toUpperCase() === subDepartment.toUpperCase()) {
                    display(user.id);
                    count++;
                } else {
                    hide(user.id);
                }
                break;
            case 'office':
                if (user.office.toUpperCase() === subDepartment.toUpperCase()) {
                    display(user.id);
                    count++;
                } else {
                    hide(user.id);
                }
                break;
            case 'jobTitle':
                if (user.jobTitle.toUpperCase() === subDepartment.toUpperCase()) {
                    display(user.id);
                    count++
                } else {
                    hide(user.id);
                }
                break;
        }
    });
    count <= 0 ? displayNoContactFound('No employees found..!!') : displayNoContactFound('');
}

//disabling and hiding delete update buttons in modal pop-up
function confirmChange(option) {
    option === 'update' ? getElement('modalHeding').innerHTML = 'Update Address' : getElement('modalHeding').innerHTML = 'Delete Address'
    option === 'update' ? setDisplayBlock(getElement('confirmUpdate')) : setDisplayNone(getElement('confirmUpdate'));
    option === 'delete' ? setDisplayBlock(getElement('confirmDelete')) : setDisplayNone(getElement('confirmDelete'));
}


//enables form filed to be edited
function editForm(boolean) {
    if (boolean) {
        enableFields();
        boolean ? setDisplayBlock(getElement("updateButton")) : setDisplayNone(getElement("updateButton"));
        boolean ? setDisplayNone(getElement("deleteButton")) : setDisplayBlock(getElement("deleteButton"));

        var employeeForm = getEmployee();
        var inputFields = employeeForm.querySelectorAll('input');
        inputFields.forEach(function (fileds) {
            fileds.removeAttribute('readOnly');
        })
    }
}

//make form fields readonly
function readOnly() {
    var employeeForm = getEmployee();
    var inputFields = employeeForm.querySelectorAll('input');
    inputFields.forEach(function (field) {
        field.readOnly = readOnly;
    });
}

//function to make fields editable , remove readonly 
function toogleEditButton(boolean) {
    var editButton = getElement('editButton');
    boolean ? editButton.removeAttribute('data-dismiss', 'modal') : editButton.setAttribute('data-dismiss', 'modal');
    boolean ? editButton.innerHTML = 'Edit' : editButton.innerHTML = 'Cancel';
    boolean ? editButton.setAttribute('onclick', 'editForm(true)') : editButton.setAttribute('onclick', 'cancelUpdate(event)');
}

//function to send id of select to make them disable
function disableFields() {
    inputSelect.forEach(element => {
        disableSelect(element)
    });
}

//function to send id of select to make then enable
function enableFields() {
    inputSelect.forEach(element => {
        enableSelect(element)
    });
}

// disables the perticulour select options
function disableSelect(selectId) {
    getElement(selectId).setAttribute('disabled', 'disabled')
}

// enables the perticulour select options
function enableSelect(selectId) {
    getElement(selectId).removeAttribute('disabled', 'disabled');
}

