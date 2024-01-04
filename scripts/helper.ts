function setDisplayBlock(element) : void {
    element.style.display = 'block'
}
//set display none
function setDisplayNone(element) : void {
    element.style.display = 'none'
}

//function to get element by id
function getElement(element) : HTMLElement {
    return document.getElementById(element);
}

function getSelectElement(element) : HTMLSelectElement{
    return document.getElementById(element) as HTMLSelectElement;
}

function getInputElement(element) : HTMLInputElement {
    return document.getElementById(element) as HTMLInputElement;
}
//function to get all form
function getEmployee() : HTMLFormElement { 
    return getElement("addEmployeeForm") as HTMLFormElement;
}

function getFormElement(element) : HTMLFormElement{
    return document.getElementById(element) as HTMLFormElement;
}

//function to set content empty
function setInnerHtmlEmpty(elements) : void {
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = '';
    }
}

//function get Element by class names
function getByClassName(elment) : HTMLCollection {
    return document.getElementsByClassName(elment);
}

//function to insert element inside the element
function insertElement(element, data) : void {
    element.appendChild(data);
}

//function to hide the modal when we click on cancal or delete submit
function hideModal() : void {
    $('#formModal').modal('hide');
}

//fucntion to display model
function displayModal() {
    $('#loginModal').modal('show');
}

//function to display no contact found in directory
function displayNoContactFound(message) :void {
    getElement('noContactFound').innerHTML = message;
}

//search based on options
function getSearchOption() : string | null{
    var selectBox = getElement('searchOptions') as HTMLOptionElement//gettting this option by getElemetnby id 
    return selectBox.value;
}

//function to get list of employee cards
function getEmployeeCards(): HTMLCollection{
    return getByClassName('employee-directory');
}

//function to set dispaly of update and delete buttons
function setUpdateAndDeleteButtons(isEnable) : void{
    if(isEnable){
        setDisplayBlock(getElement("submitButton")) ;
        setDisplayNone(getElement("deleteButton"));
    }else{
        setDisplayBlock(getElement("deleteButton"));
        setDisplayNone(getElement("submitButton"));
    }
}

//reloads the employees on screen
function loadEmployees() : void{
    getElement('employeeDirectorySection').innerHTML='';
    initializeDirectorys();
}