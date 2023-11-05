
//dispalys error if not valid
function displayError(field, message) {
    var errorElement = getElement(field + "Error");
    setDisplayBlock(errorElement);
    errorElement.innerHTML = message;
    inputErrors = false;
  }
  
  //if validate then clear error field
  function clearError(field) {
    getElement(field + "Error").innerHTML = '';
  }
  
  //if their is any error in form not submitting the form
  function validateInput(){
    var result = 0
    var elements = getByClassName('errorStyle');
    for (var i = 0; i < elements.length; i++) {
      if(elements[i].innerHTML !== ''){
        result++;
      }       
    }
  
    if(result>0)
      return false;
    else
      return true;
  }
  
  //vlaidating input fields on change
  var inputErrors = true;
  
  function RunTimeValidation(value, fieldName) {
    var firstName , lastName, email, mobile, office, department, skype, jobTitle;
  
    switch (fieldName) {
  
      case 'firstName':
          firstName = value;
          inputErrors = !namePattern.test(firstName.trim()) ? displayError("firstName", "Name can't be emtpty and start with number") : clearError("firstName");
          break;

      case 'lastName':
          lastName = value;
          inputErrors = !namePattern.test(lastName.trim()) ? displayError("lastName", "Name can't be emtpty and start with number") : clearError("lastName");
          break;
  
      case 'email':
          email = value;
          inputErrors = (!emailregex1.test(email.trim()) || !emailregex2.test(email.trim()) || !emailregex3.test(email.trim())) ? displayError("email", "Email format is wrong") : clearError("email");
          break;
  
      case 'mobile':
          mobile = value.trim();
          let input1 = getElement('inputMobile');
          input1.value = input1.value.replace(noChar, "");
          inputErrors = (!mob.test(mobile) || !phoneno.test(mobile) || !zerosReg.test(mobile) || mobile.trim() === "") ? displayError("mobile", "Mobile number format is wrong") : clearError("mobile");
          break;
  
      case 'office':
        office = value;
        inputErrors = (office.trim() === "") ? displayError("office", "Please enter office place") : clearError("office");
        break;
  
      case 'department':
        department = value;
        inputErrors = (department.trim() === "") ? displayError("department", "Please enter department name") : clearError("department");
        break;
  
      case 'skype':
          skype = value;
          inputErrors = (skype.trim() === "" || !emailregex1.test(skype.trim()) || !emailregex2.test(skype.trim()) || !emailregex3.test(skype.trim())) ? displayError("skype", "Please enter valid  id") : clearError("skype");
          break;
  
     case 'jobTitle':
          jobTitle = value;
          inputErrors = (jobTitle.trim() === "") ? displayError("jobTitle", "Please enter valid job title text") : clearError("jobTitle");
          break;

      default:
          break;
  }
  
    return inputErrors;
  }
  
  //form is not submiited if any field is empty
  function validateField(field, value) {
    value.trim() === '' ? displayError(field, "Field cannot be empty") : clearError(field);;
  }
  
  //on submiting the form checks for empty fields
  function validateUser() {
  inputErrors = true;
  var newUserData = getEmployee()
     validateField('firstName', newUserData.elements['firstName'].value);
     validateField('lastName', newUserData.elements['lastName'].value);
     validateField('email', newUserData.elements['email'].value);
     validateField('mobile', newUserData.elements['mobile'].value);
     validateField('office', newUserData.elements['office'].value);
     validateField('department', newUserData.elements['department'].value);
     validateField('jobTitle', newUserData.elements['jobTitle'].value);
     validateField('skype', newUserData.elements['skype'].value);
  
  return inputErrors;
  }


