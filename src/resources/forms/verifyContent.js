import * as Yup from 'yup';

//Create FormField class and the constructor/object within
class FormField {
    constructor(name, label, type, validations = []) {
      this.name = name;
      this.label = label;
      this.type = type;
      this.validations = validations;
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
    new FormField('firstName', 'First Name', 'text',
      [
        Yup.string()
          .matches(/^[a-zA-Z]+$/, "Only alphabetic characters are allowed")
          .max(20, "First name must be at most 20 characters")
          .required("First name is required")
      ]),
    new FormField('lastName', 'Last Name', 'text',
      [
        Yup.string()
          .matches(/^[a-zA-Z]+$/, "Only alphabetic characters are allowed")
          .max(20, "Last name must be at most 20 characters")
          .required("Last name is required")
      ]),
    new FormField('dob', 'Date of Birth', 'date',
      [
        Yup.date().required("Date of birth is required")
      ]),
    new FormField('zip', 'Zip Code', 'text',
      [
        Yup.string().matches(/^\d{5}$/, "Must be exactly 5 digits").required("Zip code is required")
      ]),  
  ];

  // Generate Yup schema dynamically
const validationSchema = Yup.object().shape(
  fields.reduce((schema, field) => {
    schema[field.name] = field.validations.reduce((fieldSchema, validation) => fieldSchema.concat(validation), Yup.mixed());
    return schema;
  }, {})
);

  
  export { initialValues, fields, validationSchema };