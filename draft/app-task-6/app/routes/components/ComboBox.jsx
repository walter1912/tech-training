import {
  ChoiceList,
  Icon,
  InlineStack,
  Tag,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

export default function ComboboxExample(props) {
  const { selected, setSelected, allTags } = props;

  const choiceList = allTags
    ? allTags.map((tag) => ({ label: tag, value: tag }))
    : [
        {
          label: "Use the shipping address as the billing address by default",
          value: "shipping",
        },
        {
          label: "Require a confirmation step",
          value: "confirmation",
        },
      ];
  const [search, setSearch] = useState("");
  const handleChange = useCallback((value) => setSelected(value), []);
  const handleSearch = useCallback((value) => setSearch(value), []);
  const handleClearButtonClick = useCallback(() => setSearch(""), []);
  const handleAddTag = useCallback(() => {

    if (search.trim() !== "") {
      if (!selected.includes(search.trim())) {
        setSelected([...selected, search.trim()]);
      }
      handleClearButtonClick()
    }
  }, [search]);
  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selected];
      options.splice(options.indexOf(tag), 1);
      setSelected(options);
    },
    [selected],
  );
  const verticalContentMarkup =
    selected.length > 0 ? (
      <InlineStack>
        {selected.map((option) => {
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {option}
            </Tag>
          );
        })}
      </InlineStack>
    ) : null;
  return (
    <div style={{ minHeight: "460px", padding: "16px" }}>
      <TextField
        verticalContent={verticalContentMarkup}
        prefix={<Icon source={SearchIcon} />}
        value={search}
        onChange={handleSearch}
        clearButton
        onClearButtonClick={handleClearButtonClick}
        label="Search or add tag"
        labelAction={{ content: "add tag", onAction: handleAddTag }}
      />
      <div style={{ marginTop: "20px" }}>
        <ChoiceList
          allowMultiple
          choices={choiceList}
          selected={selected}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
