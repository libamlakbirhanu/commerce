import { TextInput, Tooltip, Center, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";

export default function TooltipIcon({
  label,
  tooltip,
  placeholder,
  state,
  setState,
}) {
  const rightSection = (
    <Tooltip
      label={tooltip}
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size={18} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      label={label}
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  );
}
