// ReusableForm.js (Class Component)
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-mui';
import { Button, Radio, FormControl, FormLabel, FormControlLabel, FormGroup } from '@mui/material';
import FormikDateField from './FormikDateField';
import '../resources/formStyles.css' ;


  const ReusableForm = ({ initialValues = {}, currentValues = {}, onSubmit, fields = [], SubmitButton, buttonText, validationSchema, showSubmit }) => {
    const initialVals = {...initialValues, ...currentValues}
    return (
      <Formik
        initialValues={initialVals}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, submitForm, setFieldValue, values }) => (
          <Form className="form-container">
            {fields.map((field, index) => {

              // Ensure the field object has a type property
              if (!field || !field.type) {
                console.error(`Field at index ${index} is missing required properties`, field);
                return null;
              }
            // DATE field config for form template
              if (field.type === 'date') {
                return (
                  <FormikDateField
                    key={index}
                    name={field.name}
                    label={field.label}
                  />
                );
              } else if (field.type === 'radio') {
              // RADIO BUTTON field config for form template
                // Ensure the field has options property for radio type
                if (!field.options) {
                  console.error(`Field at index ${index} of type 'radio' is missing 'options' property`, field);
                  return null;
                }
                return (
                  <FormControl key={index} component="fieldset">
                    <FormLabel component="legend">{field.label}</FormLabel>
                    <Field
                      key={index}
                      component={RadioGroup}
                      name={field.name}
                    >
                      {field.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option.value}
                          control={<Radio disabled={isSubmitting} />}
                          label={option.label}
                          disabled={isSubmitting}
                        />
                      ))}
                    </Field>
                  </FormControl>
               );
              } else if (field.type === 'checkbox') {
              // CHECKBOX field config for form template
              if (!field.options.length) {
                console.error(`Field at index ${index} of type 'checkbox' is missing 'options' property`, field);
                return null;
              }
              return (
                <FormControl key={index} component="fieldset">
                  <FormLabel component="legend">{field.label}</FormLabel>
                  <FormGroup>
                    {field.options.map((option, optionIndex) => (
                          <Field
                            key={optionIndex}
                            component={CheckboxWithLabel}
                            type="checkbox"
                            name={`housingCondition`}
                            value={option.value}
                            Label={{ label: option.label }}
                            disabled={isSubmitting}
                            onChange={() => {
                              const currentValues = values.housingCondition || [];
                              if (currentValues.includes(option.value)) {
                                setFieldValue('housingCondition', currentValues.filter(v => v !== option.value));
                              } else {
                                setFieldValue('housingCondition', [...currentValues, option.value]);
                              }
                            }}
                          />
                    ))}
                  </FormGroup>
                </FormControl>
              );
              } else 
              return (
                <Field
                  key={index}
                  component={TextField}
                  name={field.name}
                  label={field.label}
                  fullWidth
                  margin="normal"
                  className="form-field"
                  helperText={field.helperText || ''}
                />
              );
            })}
        
        {showSubmit && ( // Conditionally render the submit button
          <div className="submit-button-container"> {/* Add a container for better styling */}   
            {SubmitButton ? (
              <SubmitButton onClick={submitForm} className="form-button ml-4" text={buttonText} />
            ) : (
             <Button
                type="button"
                onClick={submitForm}
                variant="contained"
                color="primary"
                className="form-button ml-4"
              >
                {buttonText || 'Submit'}
              </Button>
            )}
          </div>
         )}
        </Form>
      )}
    </Formik>
  );
};

export default ReusableForm;