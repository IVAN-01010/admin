import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TextField,
} from "react-admin";
import { report } from "../../enums";

const ReportsList = () => (
  <List perPage={100}>
    <Datagrid>
      <TextField source={report.id} />
      <TextField source={report.none_exists} />
      <TextField source={report.child_pornography} />
      <TextField source={report.drugs} />
      <TextField source={report.terrorist} />
      <TextField source={report.language_error} />
      <TextField source={report.theft} />
      <TextField source={report.occupy_screen} />
      <TextField source={report.ad_competitor} />
      <TextField source={report.other} />
      <TextField source={report.channel_id} />
      <TextField source={report.scam} />
      <TextField source={report.pull_fans} />
      <TextField source={report.personal_link} />
      <TextField source={report.spam} />

      <ShowButton />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);
export default ReportsList;
