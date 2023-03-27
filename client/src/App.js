import { Outlet } from "react-router-dom";
import BaseLayout from "components/BaseLayout/BaseLayout";

export default function App() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
