import { DataBrowserRouter, Navigate, Route } from "react-router-dom";
import NewTaskButton from "./components/NewTaskButton";
import TaskForm, {
  loader as taskFormLoader,
  action as taskFormAction,
  ErrorBoundary as TaskFormErrorBoundary,
} from "./components/TaskForm";
import Bills, {
  loader as billsLoader,
  ErrorBoundary as BillsErrorBoundary,
} from "./pages/Bills";
import Home from "./pages/Home";
import Root, { loader as rootLoader } from "./pages/Root";
import Tasks, { loader as tasksLoader } from "./pages/Tasks";
import Validation, {
  loader as validationLoader,
  action as validationAction,
} from "./pages/Validation";

const currentYear = new Date().getFullYear();

function App() {
  return (
    <DataBrowserRouter>
      <Route path="/" element={<Root />} loader={rootLoader} id="root">
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} loader={tasksLoader}>
          <Route index element={<NewTaskButton />} />
          <Route
            path="new"
            element={<TaskForm />}
            loader={taskFormLoader}
            action={taskFormAction}
          />
          <Route
            path=":taskId"
            element={<TaskForm />}
            loader={taskFormLoader}
            action={taskFormAction}
            errorElement={<TaskFormErrorBoundary />}
          />
        </Route>
        <Route
          path="validation"
          element={<Validation />}
          loader={validationLoader}
          action={validationAction}
        />
        <Route path="bills">
          <Route
            index
            element={<Navigate to={`/bills/${currentYear}`} replace />}
          />
          <Route
            path=":year"
            element={<Bills />}
            errorElement={<BillsErrorBoundary />}
          />
        </Route>
        <Route path="loaders">
          <Route path="bills/:year" loader={billsLoader} />
        </Route>
      </Route>
    </DataBrowserRouter>
  );
}

export default App;
