import {
  ActionIcon,
  Flex,
  useComputedColorScheme,
  useMantineColorScheme,
  Tooltip,
  Button,
  em,
  Text,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { IconBulb, IconBulbFilled, } from "@tabler/icons-react";
import HistoryDrawer from "../HistoryDrawer";
import { CodesandboxLogo, ClockCounterClockwise} from "@phosphor-icons/react";

function Navbar() {
  const { setColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  return (
    <>
      <Flex align="center" h="10vh" p="1vh" justify="space-between" >
        <Group gap="xs" align="center">
          <CodesandboxLogo  size={32} weight="fill" color="#2782d5" />
          <Text fz={{base: "h4", sm: "h3"}} fw="700">
            Cartero
          </Text>
        </Group>
        <Flex align={"center"} gap={"1vh"}>
          <Tooltip label="Dark/Light" position="bottom-end">
            <ActionIcon
              variant="outline"
              size={29}
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              radius="lg"
            >
              {computedColorScheme === "dark" ? (
                <IconBulbFilled size={"2.44vh"} />
              ) : (
                <IconBulb size={"2.44vh"} />
              )}
            </ActionIcon>
          </Tooltip>
          {isMobile ? (
            <Tooltip label="History" position="bottom-end">
              <ActionIcon
                size={28}
                variant="outline"
                aria-label="History button"
                onClick={open}
              >
                <ClockCounterClockwise size={32} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Button
              variant="outline"
              size="xs"
              radius={"md"}
              onClick={open}
              rightSection={<ClockCounterClockwise size={22} />}
            >
              History
            </Button>
          )}
        </Flex>
      </Flex>
      <HistoryDrawer opened={opened} close={close} />
    </>
  );
}

export default Navbar;
