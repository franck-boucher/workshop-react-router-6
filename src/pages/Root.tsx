import { Box, Stack } from "@mantine/core";
import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import TopBar from "../components/TopBar";
import { getNumberOfTasksToValidate } from "../utils/tasks";
import { getCurrentUser } from "../utils/users";

export type LoaderData = {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
  tasksToValidate: Awaited<ReturnType<typeof getNumberOfTasksToValidate>>;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const [user, tasksToValidate] = await Promise.all([
    getCurrentUser(),
    getNumberOfTasksToValidate(),
  ]);
  return { user, tasksToValidate };
};

export default function Root() {
  const { user } = useLoaderData() as LoaderData;
  return (
    <Stack sx={{ height: "100%", gap: 0 }}>
      <TopBar title="React Router 6.4" />

      {user.active && (
        <Box sx={{ flex: 1, display: "flex", gap: 16 }} px="md" pb="md">
          <SideMenu />
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      )}
    </Stack>
  );
}
