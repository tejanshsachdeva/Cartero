// import React from "react";
import {
  ActionIcon,
  Card,
  Flex,
  Text,
  Title,
  Tooltip,
  Box,
} from "@mantine/core";
import { IconTrash, IconRepeat } from "@tabler/icons-react";
import useStore from "../store";
import PropTypes from "prop-types";

const HistoryCardActionIcon = ({ label, icon: Icon, onClick }) => (
  <Tooltip label={label} position="top-end">
    <ActionIcon size={28} variant="default" aria-label={label} onClick={onClick}>
      <Icon size={"14px"} />
    </ActionIcon>
  </Tooltip>
);

HistoryCardActionIcon.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
};

function HistoryCard({ handleRepeatRequest, openDeleteModal }) {
  const { history } = useStore();

  return (
    <Box>
      {history?.toReversed().map(({ requestId, method, url, timestamp }) => (
        <Card key={requestId} shadow="sm" mb={"sm"} padding="sm" radius="md" withBorder>
          <Flex direction={"row"} align={"center"} justify={"space-between"}>
            <Title order={6}>{method}</Title>
            <Flex gap={"sm"}>
              <HistoryCardActionIcon
                label="Remove request"
                icon={IconTrash}
                onClick={() => openDeleteModal(requestId)}
              />
              <HistoryCardActionIcon
                label="Repeat request"
                icon={IconRepeat}
                onClick={() => handleRepeatRequest({ requestId, method, url, timestamp })}
              />
            </Flex>
          </Flex>
          <Text
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              cursor: "default",
            }}
            title={url}
          >
            {url}
          </Text>
          <Text size="sm" color="dimmed">
            {timestamp}
          </Text>
        </Card>
      ))}
    </Box>
  );
}

HistoryCard.propTypes = {
  handleRepeatRequest: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default HistoryCard;
