//Create FormField class and the constructor/object within
class FormField {
    constructor(name, label, type) {
      this.name = name;
      this.label = label;
      this.type = type;
    }
  }
  
//Create InitialValues class and the constructor/object within
  class InitialValues {
    constructor(firstName = '', lastName = '', dob = '', zip = '') {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dob = dob;
      this.zip = zip;
    }
  }
  
  //Create an instance of the initialValues class as blank (to be filled in by user)
  const initialValues = new InitialValues();
  
  const fields = [
    new FormField('firstName', 'First Name', 'text'),
    new FormField('lastName', 'Last Name', 'text'),
    new FormField('dob', 'Date of Birth', 'date'),
    new FormField('zip', 'Zip Code', 'text'),  
  ];
  
  export { initialValues, fields };