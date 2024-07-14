// import React from "react";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";

function KeyValuePairs({ keyValuePairs, setKeyValuePairs }) {
  const updateKeyValuePair = (index, key, value) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index] = { key, value };
    setKeyValuePairs(newKeyValuePairs);
  };

  const removeKeyValuePair = (index) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs.splice(index, 1);
    setKeyValuePairs(newKeyValuePairs);
  };

  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const KeyValuePairRow = ({ keyValuePair, index }) => (
    <Flex
      key={index}
      my={8}
      direction={{ base: "column", sm: "row" }}
      justify={{ sm: "center" }}
      gap={"10px"}
    >
      <TextInput
        placeholder="Key"
        value={keyValuePair.key}
        onChange={(e) => updateKeyValuePair(index, e.target.value, keyValuePair.value)}
        flex={1}
        size="md"
        radius="md"
      />
      <TextInput
        placeholder="Value"
        value={keyValuePair.value}
        onChange={(e) => updateKeyValuePair(index, keyValuePair.key, e.target.value)}
        flex={1}
        size="md"
        radius="md"
      />
      <Button
        type="button"
        size="md"
        radius="md"
        color="red"
        variant="filled"
        onClick={() => removeKeyValuePair(index)}
        aria-label="Remove key-value pair"
        rightSection={<IconTrash size={16} />}
      >
        Delete
      </Button>
    </Flex>
  );

  KeyValuePairRow.propTypes = {
    keyValuePair: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <Box>
      {keyValuePairs?.map((keyValuePair, index) => (
        <KeyValuePairRow keyValuePair={keyValuePair} index={index} key={index} />
      ))}
      <Button type="button" onClick={addKeyValuePair} my={5} radius={"md"}>
        Add
      </Button>
    </Box>
  );
}

KeyValuePairs.propTypes = {
  keyValuePairs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  setKeyValuePairs: PropTypes.func.isRequired,
};

export default KeyValuePairs;
