import { Stack, Center } from "@mantine/core";
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import Page from "../components/Page";
import TaskToValidate from "../components/TaskToValidate";
import { getTasksToValidate, validateTask } from "../utils/tasks";

type LoaderData = {
  tasks: Awaited<ReturnType<typeof getTasksToValidate>>;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const tasks = await getTasksToValidate();
  return { tasks };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const taskId = formData.get("taskId") as string;
  if (taskId) await validateTask(taskId);
};

export default function Validation() {
  const { tasks } = useLoaderData() as LoaderData;

  return (
    <Page title="Validate tasks">
      <Stack>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskToValidate key={task.id} task={task} />)
        ) : (
          <Center sx={{ fontStyle: "italic" }}>No tasks to validate</Center>
        )}
      </Stack>
    </Page>
  );
}
