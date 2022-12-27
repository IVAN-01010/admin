import {
  DatagridConfigurable,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  SelectColumnsButton,
  ShowButton,
  TextField,
  TopToolbar,
} from "react-admin";
import { reportList as report } from "../../enums";

const ReportsList = () => {
  return (
    <List
      perPage={100}
      actions={
        <TopToolbar>
          <SelectColumnsButton />
        </TopToolbar>
      }
    >
      <DatagridConfigurable>
        <TextField textAlign="center" source={report.channel_id} />
        <NumberField source={report.pull_fans} textAlign="center" />
        <NumberField textAlign="center" source={report.child_pornography} />
        <NumberField textAlign="center" source={report.scam} />
        <NumberField textAlign="center" source={report.theft} />
        <NumberField textAlign="center" source={report.personal_link} />
        <NumberField textAlign="center" source={report.other} />
        <ShowButton />
        <EditButton label="" />
        <DeleteButton label="" redirect={false} />
      </DatagridConfigurable>
    </List>
  );
};
export default ReportsList;
