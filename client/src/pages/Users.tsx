import {
  PageDashboardLayout,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/PageDashboardLayout";
import Instruction from "../components/instruction/Instruction";
import UserTable from "../components/user/UserTable";

function Users() {
  return (
    <PageDashboardLayout $templateColumns="1fr 1fr">
      <FirstSection>
        <Instruction>
          To view the user details in the table, locate the row containing it
          and click on the corresponding cell with your mouse cursor.
        </Instruction>
        <UserTable />
      </FirstSection>
      <SecondSection></SecondSection>
    </PageDashboardLayout>
  );
}

export default Users;
