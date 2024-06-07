// ReusableForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Checkbox, RadioGroup } from 'formik-mui';
import { Button, Radio, FormControl, FormLabel, FormControlLabel, LinearProgress } from '@mui/material';
import FormikDateField from './FormikDateField';
import '../resources/formStyles.css' ;


  const ReusableForm = ({ initialValues = {}, onSubmit, fields = [], SubmitButton, buttonText }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, submitForm }) => (
          <Form className="form-container">
            {fields.map((field, index) => {
              // Add logging to debug field structure
              //console.log(`Rendering field:`, field);

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
                return (
                  <Field
                    key={index}
                    component={Checkbox}
                    name={field.name}
                    label={field.label}
                    // Add any other props as needed for checkbox input
                  />
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
          {SubmitButton ? (
            <SubmitButton onClick={submitForm} className="form-button" text={buttonText} />
          ) : (
            <Button
              type="button"
              onClick={submitForm}
              variant="contained"
              color="primary"
              className="form-button"
            >
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ReusableForm;