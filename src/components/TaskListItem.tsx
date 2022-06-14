import { Badge, Box, Paper, PaperProps, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Task } from "../utils/tasks";

type TaskListItemProps = {
  task: Task;
};

export default function TaskListItem({ task }: TaskListItemProps) {
  return (
    <Box
      component={Link}
      to={`/tasks/${task.id}`}
      sx={{ textDecoration: "none" }}
    >
      <Paper
        p="sm"
        withBorder
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text weight="bold">{task.title}</Text>

        <Badge color={task.isValidated ? "green" : "orange"} variant="outline">
          {task.isValidated ? "Validated" : "Not validated"}
        </Badge>
      </Paper>
    </Box>
  );
}
