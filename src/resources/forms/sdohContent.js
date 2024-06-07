//Create FormField class and the constructor/object within
class FormField {
    constructor(name, label, type, options = []) {
      this.name = name;
      this.label = label;
      this.type = type;
      this.options = options;
    }
  }
  
//Create InitialValues class and the constructor/object within
  class InitialValues {
    constructor(mrn = '', fin = '', housingSecurity = '', foodSecurity = '', housingCondition = '', foodAccess = '', healthcareAccess = '', utilitySecurity = '', childcareAccess = '', occupationAccess = '', educationAccess = '', financialSecurity = '', physicalSecurity = '', emotionalSecurity = '', safetySecurity = '', wellbeingSecurity = '', requestHelp = '') {
      this.mrn = mrn;
      this.fin = fin;
      this.housingSecurity = housingSecurity;
      this.foodSecurity = foodSecurity;
      this.housingCondition = housingCondition;
      this.foodAccess = foodAccess;
      this.healthcareAccess = healthcareAccess;
      this.utilitySecurity = utilitySecurity;
      this.childcareAccess = childcareAccess;
      this.occupationAccess = occupationAccess;
      this.educationAccess = educationAccess;
      this.financialSecurity = financialSecurity;
      this.physicalSecurity = physicalSecurity;
      this.emotionalSecurity = emotionalSecurity;
      this.safetySecurity = safetySecurity;
      this.wellbeingSecurity = wellbeingSecurity;
      this.requestHelp = requestHelp;
      
    }
  }
  
  //Create an instance of the initialValues class as blank (to be filled in by user)
  const initialValues = new InitialValues();
  
  //Create fields object and fill with instances of the FormField class for each field. Builds out the questions(fields) and possible answers


  const fields = [
    //new FormField('mrn', 'MRN', 'text'),
    //new FormField('fin', 'FIN', 'text'),
    new FormField(
        'housingSecurity',
        'Are you worried or concerned that in the next two months you may not have stable housing that you own, rent, or stay in as a part of a household?',
        'radio',
        [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ]
      ),
    new FormField(
        'foodSecurity',
        'Within the past 12 months, have you worried that your food would run out before you had enough money to buy more?',
        'radio',
        [
            { value: 'Often True', label: 'Often True' },
            { value: 'Sometimes True', label: 'Sometimes True' },
            { value: 'Never True', label: 'Never True' },
        ]
    ),
    new FormField(
        'housingCondition',
        'Think about the place you live. Do you have problems with any of the following?',
        'radio',
        [
            { value: 'Bug Infestation', label: 'Bug Infestation' },
            { value: 'Mold', label: 'Mold' },
            { value: 'Lead Paint or Pipes', label: 'Lead Paint or Pipes' },
            { value: 'Inadequate Heat', label: 'Inadequate Heat' },
            { value: 'Oven or Stove not working', label: 'Oven or Stove not working' },
            { value: 'No or not working smoke detectors', label: 'No or not working smoke detectors' },
            { value: 'Water Leaks', label: 'Water Leaks' },
            { value: 'None of the above', label: 'None of the above' },
        ]
    ),  
    new FormField(
        'foodAccess',
        'Within the past 12 months, the food you bought did not last and you did not have money to get more.',
        'radio',
        [
            { value: 'Often True', label: 'Often True' },
            { value: 'Sometimes True', label: 'Sometimes True' },
            { value: 'Never True', label: 'Never True' },
        ]
    ),
    new FormField(
        'healthcareAccess',
        'Do you put off or neglect going to the doctor because of  distance or transportation?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ]
    ),  
    new FormField(
        'utilitySecurity',
        'In the past 12 months has the electric, gas, oil, or water  company threatened to shut off services in your home?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'Already shut off', label: 'Already shut off' },
        ]
    ),  
    new FormField(
        'childcareAccess',
        'Do problems getting child care make it difficult for you to work or study?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ]
    ),
    new FormField(
        'occupationAccess',
        'Do you have a job?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ]
    ),  
    new FormField(
        'educationAccess',
        'Do you have a high school degree?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ]
    ),    
    new FormField(
        'financialSecurity',
        'How often does this describe you? I do not have enough money to pay my bills...',
        'radio',
        [
            { value: 'Never', label: 'Never' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Sometimes', label: 'Sometimes' },
            { value: 'Fairly Often', label: 'Fairly Often' },
            { value: 'Frequently', label: 'Frequently' },
        ]
    ),  
    new FormField(
        'physicalSecurity',
        'How often does anyone, including family, physically hurt you?',
        'radio',
        [
            { value: 'Never', label: 'Never' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Sometimes', label: 'Sometimes' },
            { value: 'Fairly Often', label: 'Fairly Often' },
            { value: 'Frequently', label: 'Frequently' },
        ]
    ),  
    new FormField(
        'emotionalSecurity',
        'How often does anyone, including family, insult or talk down to you?',
        'radio',
        [
            { value: 'Never', label: 'Never' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Sometimes', label: 'Sometimes' },
            { value: 'Fairly Often', label: 'Fairly Often' },
            { value: 'Frequently', label: 'Frequently' },
        ]
    ),  
    new FormField(
        'safetySecurity',
        'How often does anyone, including family, threaten you with harm?',
        'radio',
        [
            { value: 'Never', label: 'Never' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Sometimes', label: 'Sometimes' },
            { value: 'Fairly Often', label: 'Fairly Often' },
            { value: 'Frequently', label: 'Frequently' },
        ]
    ),  
    new FormField(
        'wellbeingSecurity',
        'How often does anyone, including family, scream or curse at you?',
        'radio',
        [
            { value: 'Never', label: 'Never' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Sometimes', label: 'Sometimes' },
            { value: 'Fairly Often', label: 'Fairly Often' },
            { value: 'Frequently', label: 'Frequently' },
        ]
    ),
    new FormField(
        'requestHelp',
        'Would you like help with any of these needs?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
        ]
    ),      
  ];
  
  export { initialValues, fields };