import { Box, Title } from "@mantine/core";
import { CodeHighlightTabs } from "@mantine/code-highlight";

import useStore from "../store";

function CodeSnippet() {
  const { response } = useStore();
  return (
    <>
      {response?.fetchCode && response?.axiosCode && (
        <Box>
          <Title order={3} fw={700} my={20}>
            Code Snippet
          </Title>
          <Box my={24} mx={"auto"}>
            <CodeHighlightTabs
              withExpandButton
              defaultExpanded={false}
              expandCodeLabel="Expand"
              collapseCodeLabel="Collapse"
              code={[
                {
                  fileName: "Using Fetch API",
                  code: response.fetchCode,
                  language: "js",
                },
                {
                  fileName: "Using Axios Library",
                  code: response.axiosCode,
                  language: "js",
                },
              ]}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default CodeSnippet;
