"use client";
import { Autocomplete, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

// Define types for options
interface Option {
  value: string;
  label: string;
}

function Search() {
  // Define the options with type Option[]
  const deselectedOptions: Option[] = useMemo(
    () => [
      { value: 'rustic', label: 'Rustic' },
      { value: 'antique', label: 'Antique' },
      { value: 'vinyl', label: 'Vinyl' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'refurbished', label: 'Refurbished' },
    ],
    []
  );

  // Type state variables
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>(deselectedOptions);

  // Type the function parameters
  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) =>
          option.value.match(selectedItem)
        );
        return matchedOption ? matchedOption.label : '';
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
    />
  );
}

export default Search;
