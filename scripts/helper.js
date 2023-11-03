function setDisplayBlock(element) {
    element.style.display = 'block'
}
//set display none
function setDisplayNone(element) {
    element.style.display = 'none'
}

//function to get element by id
function getElement(element) {
    return document.getElementById(element);
}

//function to get all form
function getEmployee() { 
    return getElement("myForm");
}

//function to set content empty
function setInnerHtmlEmpty(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = '';
    }
}

//function get Element by class names
function getByClassName(elment) {
    return document.getElementsByClassName(elment);
}

//function to retive the current user data in right section
function getUserAddress() {
    return document.querySelectorAll('#userDataList .user-full-address');
}

//function to insert element inside the element
function insertElement(element, data) {
    element.appendChild(data);
}

//function to delete the user data in Right user data section
function removeUser() {
    setInnerHtmlEmpty(getUserAddress());
}