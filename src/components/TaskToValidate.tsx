import { Button, Paper, Text } from "@mantine/core";
import { Form } from "react-router-dom";
import { Task } from "../utils/tasks";

export default function TaskToValidate({ task }: { task: Task }) {
  return (
    <Paper
      p="sm"
      withBorder
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Text weight="bold">{task.title}</Text>
        <Text>{task.description}</Text>
      </div>
      <Form method="post">
        <Button type="submit" color="green" name="taskId" value={task.id}>
          Validate
        </Button>
      </Form>
    </Paper>
  );
}
