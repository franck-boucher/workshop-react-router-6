import { ActionIcon, Alert, Anchor, Group, Stack, Text } from "@mantine/core";
import {
  Link,
  LoaderFunction,
  useFetcher,
  useParams,
  useRouteError,
} from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ChevronLeft, ChevronRight } from "tabler-icons-react";
import BillItem, { BillItemSkeleton } from "../components/BillItem";
import Page from "../components/Page";
import { Bill, getBillsForYear } from "../utils/bills";

export const loader: LoaderFunction = async ({ params }) => {
  if (params.year) return getBillsForYear(Number(params.year));
  return [];
};

export default function Bills() {
  const params = useParams();
  const year = parseInt(params.year || "", 10);
  if (isNaN(year)) {
    throw new Error(`Invalid year: ${params.year}`);
  }

  const { load, data, state } = useFetcher<Bill[]>();

  useEffect(() => load(`/loaders/bills/${year}`), [load, year]);

  return (
    <Page
      title={`Bills of year ` + year}
      leftContent={
        <Group>
          <ActionIcon component={Link} to={`/bills/${year - 1}`}>
            <ChevronLeft />
          </ActionIcon>
          <ActionIcon component={Link} to={`/bills/${year + 1}`}>
            <ChevronRight />
          </ActionIcon>
        </Group>
      }
    >
      <Stack spacing="xs">
        {!data || state === "loading"
          ? Array.from({ length: 12 }).map((_, i) => (
              <BillItemSkeleton key={i} />
            ))
          : data.map((bill) => <BillItem key={bill.id} bill={bill} />)}
      </Stack>
    </Page>
  );
}

const currentYear = new Date().getFullYear();

export const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <Alert
      icon={<AlertCircle />}
      title={<Text>{`Erreur`}</Text>}
      color="red"
      variant="outline"
    >
      <Text mb="lg">{error.message}</Text>
      <Anchor component={Link} to={`/bills/${currentYear}`} replace>
        Go to bills of year {currentYear}
      </Anchor>
    </Alert>
  );
};
