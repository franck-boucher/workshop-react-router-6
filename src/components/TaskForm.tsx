import {
  CloseButton,
  Group,
  Paper,
  Stack,
  Title,
  Button,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { createTask, deleteTask, editTask, getTask } from "../utils/tasks";

type LoaderData = {
  task: Awaited<ReturnType<typeof getTask>>;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  if (params.taskId) {
    const task = await getTask(params.taskId);
    return { task };
  }
  return { task: null };
};

type FormData = {
  title: string;
  description: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { taskId } = params;

  const getFormData = async () => {
    const formData = await request.formData();
    return Object.fromEntries(formData) as FormData;
  };

  if (!taskId) {
    const formData = await getFormData();
    await createTask(formData);
  } else if (request.method === "DELETE") {
    await deleteTask(taskId);
  } else {
    const formData = await getFormData();
    await editTask({ id: taskId, ...formData });
  }

  return redirect("/tasks");
};

export default function TaskForm() {
  const { task } = useLoaderData() as LoaderData;
  return (
    <Paper withBorder p="md" key={task ? task.id : "new"}>
      <Form method="delete" id="deleteTaskForm" />
      <Form method="post">
        <Stack>
          <Group position="apart">
            <Title order={3}>{task ? "Edit" : "New"} task</Title>
            <ActionIcon component={Link} to="/tasks" replace>
              <CloseButton title="Close task form" iconSize={20} />
            </ActionIcon>
          </Group>

          <TextInput
            name="title"
            placeholder="Title of the task"
            required
            label="Title"
            defaultValue={task ? task.title : ""}
          />

          <TextInput
            name="description"
            placeholder="Description of the task"
            label="Description"
            defaultValue={task ? task.description : ""}
          />

          <Group spacing="xs">
            <Button type="submit">{task ? "Edit" : "Create"}</Button>
            {task && (
              <Button type="submit" color="red" form="deleteTaskForm">
                Delete
              </Button>
            )}
          </Group>
        </Stack>
      </Form>
    </Paper>
  );
}
