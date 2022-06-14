import { Box, Group, Stack, Center } from "@mantine/core";
import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import Page from "../components/Page";
import TaskListItem from "../components/TaskListItem";
import VerticalDivider from "../components/VerticalDivider";
import { getTasks } from "../utils/tasks";

type LoaderData = {
  tasks: Awaited<ReturnType<typeof getTasks>>;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const tasks = await getTasks();
  return { tasks };
};

export default function Tasks() {
  const { tasks } = useLoaderData() as LoaderData;
  return (
    <Page title="Tasks">
      <Group spacing="xl" sx={{ minHeight: "200px" }}>
        <Stack spacing="sm" sx={{ flex: 1 }}>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskListItem key={task.id} task={task} />)
          ) : (
            <Center sx={{ fontStyle: "italic" }}>No tasks yet</Center>
          )}
        </Stack>

        <VerticalDivider />

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Group>
    </Page>
  );
}
