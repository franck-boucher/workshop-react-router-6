import { Button, ButtonProps, Center } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { Link } from "react-router-dom";

export default function NewTaskButton() {
  return (
    <Center sx={{ height: "100%" }}>
      <Button component={Link} to="/tasks/new" replace leftIcon={<Plus />}>
        Create a new task
      </Button>
    </Center>
  );
}
