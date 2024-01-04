// Allow only characters in starting
const namePattern : RegExp = /^[a-zA-Z]/;

//nor character allowed
 const numbers : RegExp= /[^0-9]/g;

// Validates email
 const emailAllowHyphen : RegExp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//This regex allows for a domain part with hyphens.
 const domainMinLength2 : RegExp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})$/;//This regex ensures that the top-level domain (TLD) is at least two characters long.
 const allowMultipleSubDomain : RegExp= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;//This regex combines aspects of the first two and allows for multiple subdomains.

// Regex for contact validation
 const zerosReg : RegExp= /[1-9]/g;
 const mob : RegExp= /^[1-9]{1}[0-9]{9}$/;
 const phoneno : RegExp= /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

// Landline validation
 const landlineNo : RegExp= /^\(?(\d{3})\)?[- ]?(\d{2})[- ]?(\d{7})$/;

// Website validation code validates protocol and semicolon then domain either start with www or https not  
//Matches the dot notation for the top-level domain (TLD) and any subsequent subdomains,Matches the optional path,
 const websiteregex : RegExp= /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;


 // gmail validation for domain

 const allowedDomain : RegExp= /@gmail\.com$/i;