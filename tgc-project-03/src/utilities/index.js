function validateEmail(email) {
  // console.log("this validate run" ,email  )
  let regex =
    /^[\w#][\w\.\’+#](.[\w\\’#]+)\@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*(.[a-zA-Z]{2,20})$/;

  if (email.match(regex)) {
    // console.log("this matched the email");
    return true;
  }
  return false;
}

module.exports = validateEmail;
