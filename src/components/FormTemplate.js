// ReusableForm.js (Class Component)
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-mui';
import { Button, Radio, FormControl, FormLabel, FormControlLabel, FormGroup } from '@mui/material';
import FormikDateField from './FormikDateField';
import '../resources/formStyles.css' ;
import { useTranslation } from 'react-i18next';
  
  
  const ReusableForm = ({ initialValues = {}, currentValues = {}, onSubmit, fields = [], SubmitButton, buttonText, validationSchema, showSubmit }) => {
    
    const initialVals = {...initialValues, ...currentValues}
    const { t } = useTranslation();
    
    return (
      <Formik
        initialValues={initialVals}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, submitForm, setFieldValue, values }) => (
          <Form className="form-container">
            {fields.map((field, index) => {
              const fieldLabel = t(field.label); 
              // 2. Translate options (if the field has options):
              let options = field.options || []; 
              if (field.type === 'radio' || field.type === 'checkbox') {
                options = options.map(option => ({
                  ...option,
                  label: field.name === 'address' //skip translate on these fields
                    ? option.label 
                    :t(`${field.name}.options.${option.value}`)
                }));
              }          
              // Ensure the field object has a type property
              if (!field || !field.type) {
                console.error(`Field at index ${index} is missing required properties`, field);
                return null;
              }
              if (field.type === 'date') {
                return (
                  <FormikDateField
                    key={index}
                    name={field.name}
                    label={fieldLabel}
                  />
                );
              } else if (field.type === 'radio') {
                // Ensure the field has options property for radio type
                if (!field.options) {
                  console.error(`Field at index ${index} of type 'radio' is missing 'options' property`, field);
                  return null;
                }
                return (
                  <FormControl key={index} component="fieldset">
                    <FormLabel component="legend">{fieldLabel}</FormLabel>
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
                          label={
                            field.name === 'address'
                              ? option.label
                              : t(option.label)
                          }
                          disabled={isSubmitting}
                        />
                      ))}
                    </Field>
                  </FormControl>
               );
              } else if (field.type === 'checkbox') {
              if (!field.options.length) {
                console.error(`Field at index ${index} of type 'checkbox' is missing 'options' property`, field);
                return null;
              }
              return (
                <FormControl key={index} component="fieldset">
                  <FormLabel component="legend">{fieldLabel}</FormLabel>
                  <FormGroup>
                    {field.options.map((option, optionIndex) => (
                          <Field
                            key={optionIndex}
                            component={CheckboxWithLabel}
                            type="checkbox"
                            name={`housingCondition`}
                            value={option.value}
                            Label={{ label: t(option.label) }}
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
                  label={fieldLabel}
                  fullWidth
                  margin="normal"
                  className="form-field"
                  helperText={t(field.helperText) || ''}
                />
              );
            })}
        
        {showSubmit && ( 
          <div className="submit-button-container">
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