import React from 'react'; // No need for useState and useEffect here
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from   
 '@mui/material/FormControl';
import Select from '@mui/material/Select';


function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: '1em', minWidth: '10em' }}>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"   
        value={i18n.language}
        label="Language"
        onChange={handleLanguageChange}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        {/* Add more MenuItem components for other languages */}
      </Select>
    </FormControl>
  );
}

export default LanguageSwitcher;