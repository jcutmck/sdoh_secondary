import * as Yup from 'yup';

//Create FormField class and the constructor/object within
class FormField {
  constructor(name, label, type, options = [], validations = []) {
      this.name = name;
      this.label = label;
      this.type = type;
      this.options = options;
      this.validations = validations;
  }
}

class InitialValues {
  constructor(address = '') {
      this.address = address;
  }
}

const initialValues = new InitialValues();

// Creating the fields dynamically in the component

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Please select an address')
});

export { FormField, InitialValues, initialValues, validationSchema };