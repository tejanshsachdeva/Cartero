// import React from "react";
import { Center, Drawer, Text, Button, Box, ScrollArea } from "@mantine/core";
import { modals } from "@mantine/modals";
import useStore from "../store";
import HistoryCard from "./HistoryCard";
import fetchFromAPI from "../utils/fetchFromAPI";
import { toKeyValuePairs, validJsonBody } from "../utils/helpers";
import PropTypes from "prop-types";

function HistoryDrawer({ opened, close }) {
  const {
    history,
    setLoading,
    setResponse,
    clearHistory,
    deleteFromHistory,
    repeatRequestFromHistory,
  } = useStore();

  const handleRepeatRequest = async (request) => {
    close(); // close the drawer
    setLoading(true);
    const startTime = new Date().getTime();

    const updatedReq = {
      ...request,
      queryParams: toKeyValuePairs(request.params),
      requestHeaders: toKeyValuePairs(request.headers),
      jsonRequestBody: validJsonBody(request.data),
    };

    repeatRequestFromHistory(updatedReq);

    try {
      const res = await fetchFromAPI(request);
      setResponse(res);
    } catch (error) {
      const elapsedTime = new Date().getTime() - startTime;
      setResponse({
        status: error.response ? error.response.status : 500,
        responseTime: elapsedTime,
        data: error.response ? error.response.data : "An error occurred",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (requestId) =>
    modals.openConfirmModal({
      title: "Delete Request",
      centered: true,
      size: "sm",
      radius: "md",
      children: (
        <Text size="md">Are you sure you want to delete this request?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel Delete Request."),
      onConfirm: () => deleteFromHistory(requestId),
    });

  const clearHistoryModal = () =>
    modals.openConfirmModal({
      title: "Clear History",
      centered: true,
      size: "sm",
      radius: "md",
      children: (
        <Text size="md">
          Are you sure you want to clear your history? Your data will be permanently lost.
        </Text>
      ),
      labels: { confirm: "Clear", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel Clear History."),
      onConfirm: () => clearHistory(),
    });

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="History"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {history?.length > 0 ? (
        <>
          <HistoryCard
            openDeleteModal={openDeleteModal}
            handleRepeatRequest={handleRepeatRequest}
          />
          <Box
            py={16}
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "var(--mantine-color-body)",
            }}
          >
            <Button radius={"md"} size="md" fullWidth onClick={clearHistoryModal}>
              Clear History
            </Button>
          </Box>
        </>
      ) : (
        <Center>
          <Text>Your History is clear ^_^ </Text>
        </Center>
      )}
    </Drawer>
  );
}

HistoryDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default HistoryDrawer;
