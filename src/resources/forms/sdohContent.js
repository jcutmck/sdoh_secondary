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
    constructor(mrn = '', fin = '', participation = '', housingSecurity = '', foodSecurity = '', housingCondition = [], foodAccess = '', healthcareAccess = '', utilitySecurity = '', childcareAccess = '', occupationAccess = '', educationAccess = '', financialSecurity = '', physicalSecurity = '', emotionalSecurity = '', safetySecurity = '', wellbeingSecurity = '', requestHelp = '', sdohConsentProgram ='', sdohConsentHelp =''  ) {
      this.mrn = mrn;
      this.fin = fin;
      this.participation = participation;
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
      this.sdohConsentProgram = sdohConsentProgram;
      this.sdohConsentHelp = sdohConsentHelp;
    }
  }
  
  //Create an instance of the initialValues class as blank (to be filled in by user)
  const initialValues = new InitialValues();
  
  //Create fields object and fill with instances of the FormField class for each field. Builds out the questions(fields) and possible answers
  const fields = [
    new FormField(
        'participation',
        'Please answer a few questions about your life.',
        'radio',
        [
          { value: 'I choose to participate', label: 'I choose to participate' },
          { value: 'I choose not to participate', label: 'I choose not to participate' },
        ]
      ),
    new FormField(
        'housingSecurity',
        'Are you worried or concerned that in the next two months you may not have stable housing that you own, rent, or stay in as a part of a household?',
        'radio',
        [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
      ),
      new FormField(
        'housingCondition',
        'Think about the place you live. Do you have problems with  any of the following? ',
        'checkbox',
        [
            { value: 'Bug Infestation', label: 'Bug Infestation' },
            { value: 'Mold', label: 'Mold' },
            { value: 'Lead Paint or Pipes', label: 'Lead Paint or Pipes' },
            { value: 'Inadequate Heat', label: 'Inadequate Heat' },
            { value: 'Oven or Stove not working', label: 'Oven or Stove not working' },
            { value: 'No or not working smoke detectors', label: 'No or not working smoke detectors' },
            { value: 'Water Leaks', label: 'Water Leaks' },
            { value: 'None of the above', label: 'None of the above' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),  
      new FormField(
        'foodSecurity',
        'Within the past 12 months, have you worried that your food would run out before you had enough money to buy more?',
        'radio',
        [
            { value: 'Often true', label: 'Often true' },
            { value: 'Sometimes true', label: 'Sometimes true' },
            { value: 'Never true', label: 'Never true' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),
    new FormField(
        'foodAccess',
        'Within the past 12 months, the food you bought did not last and you did not have money to get more.',
        'radio',
        [
            { value: 'Often true', label: 'Often true' },
            { value: 'Sometimes true', label: 'Sometimes true' },
            { value: 'Never true', label: 'Never true' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),
    new FormField(
        'healthcareAccess',
        'Do you put off or neglect going to the doctor because of  distance or transportation?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),  
    new FormField(
        'childcareAccess',
        'Do problems getting child care make it difficult for you to work or study?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),
    new FormField(
        'occupationAccess',
        'Do you have a job?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),  
    new FormField(
        'educationAccess',
        'Do you have a high school diploma?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'Fairly often', label: 'Fairly often' },
            { value: 'Frequently', label: 'Frequently' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'Fairly often', label: 'Fairly often' },
            { value: 'Frequently', label: 'Frequently' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'Fairly often', label: 'Fairly often' },
            { value: 'Frequently', label: 'Frequently' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'Fairly often', label: 'Fairly often' },
            { value: 'Frequently', label: 'Frequently' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
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
            { value: 'Fairly often', label: 'Fairly often' },
            { value: 'Frequently', label: 'Frequently' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),
    new FormField(
        'legalStatus',
        'In the past year, have you spent more than 2 nights in a row in a jail, prison, detention center or juvenile correction facility?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),    
    new FormField(
        'refugeSecurity',
        'Are you a refugee?',
        'radio',
        [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),    
    new FormField(
        'militaryService',
        'Military Status:',
        'radio',
        [
            { value: 'Does not apply', label: 'Does not apply' },
            { value: 'Active service', label: 'Active service' },
            { value: 'Veteran/Honorably discharged', label: 'Veteran/Honorably discharged' },
            { value: 'Veteran/Dishonorably discharged', label: 'Veteran/Dishonorably discharged' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),    
    new FormField(
        'requestHelp',
        'Would you like help with any of these needs?',
        'radio',
        [
            { value: 'YES', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'I choose not to answer', label: 'I choose not to answer' },
        ]
    ),
    new FormField(
        'sdohConsentProgram',
        'I agree to let UT Medical Center and its affiliates share the information I give here with local groups to help find resources for me.',
        'radio',
        [
          { value: 'I agree', label: 'I agree' },
          { value: 'I do not agree', label: 'I do not agree' },
          { value: 'Does not apply', label: 'Does not apply' },
        ]
      ),
      new FormField(
        'sdohConsentHelp',
        'I agree to let UT Medical Center share the information I give here with its affiliates to better understand community needs.',
        'radio',
        [
          { value: 'I agree', label: 'I agree' },
          { value: 'I do not agree', label: 'I do not agree' },
          { value: 'Does not apply', label: 'Does not apply' },
        ]
      ),      
  ];
  
  export { initialValues, fields };