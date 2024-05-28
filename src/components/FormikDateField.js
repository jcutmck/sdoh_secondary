import React from 'react';
import { useField, useFormikContext } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';

const FormikDateField = ({ name, label }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (newValue) => {
    setFieldValue(name, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={field.value || null}
        onChange={handleChange}
        slotProps={{ textField: { variant: 'outlined' } }}
      />
    </LocalizationProvider>
  );
};

export default FormikDateField;