import { Group, Flex, Divider, Box} from "@mantine/core";
import {
  Bug,
} from "@phosphor-icons/react";
import SocialIcon from "./SocialIcon";

function Footer() {
  return (
    <Box mt="auto">
      <Divider mb="sm" />

      <Flex direction="column" align="center" justify="center" gap="xs" my="sm">
        <Flex
          direction="column"
          gap="5px"
          justify="center"
          style={{ textWrap: "balance", textAlign: "center" }}
        >
        <div>If you have any issues or feature requests, feel free to list them here:</div>
        </Flex>

        <Group gap="sm" wrap="nowrap">
          <SocialIcon
            link={"https://github.com/tejanshsachdeva/Cartero/issues"}
          >
            <Bug size={24} color="#2782d5" />
          </SocialIcon>
        </Group>
      </Flex>
    </Box>
  );
}

export default Footer;
