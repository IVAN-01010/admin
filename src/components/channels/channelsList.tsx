import {
  DatagridConfigurable,
  DeleteButton,
  EditButton,
  FilterButton,
  List,
  ReferenceManyField,
  SelectColumnsButton,
  SelectInput,
  ShowButton,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { channel, user } from "../../enums";
// const QuickFilter = ({ label, source, defaultValue }) => {
//   const translate = useTranslate();
//   return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
// };
const ChannelFilter = [
  <TextInput
    label="Search"
    source="q"
    placeholder="Search for channel Title"
    alwaysOn
    fullWidth
  />,
  <TextInput
    label="link"
    source={channel.link}
    placeholder="Search for channel link"
    fullWidth
  />,
  <TextInput
    label="id"
    source={channel.id}
    placeholder="Search for channel id"
    fullWidth
  />,
  <SelectInput
    source={channel.type}
    title="Type"
    choices={[
      { id: "bots", name: "Bot" },
      { id: "channels", name: "Channel" },
      { id: "groups", name: "Group" },
    ]}
  />,
  <SelectInput
    title="Status"
    source={channel.status}
    choices={[
      { id: "working", name: "Working" },
      { id: "normal", name: "Normal" },
    ]}
  />,
  <SelectInput
    title="Language"
    source={channel.language}
    choices={[
      { id: "en", name: "English" },
      { id: "zh", name: "Chinese" },
    ]}
  />,
];
const ChannelsList = () => {
  return (
    // @ts-ignore
    <List
      perPage={100}
      filters={ChannelFilter}
      actions={
        <TopToolbar>
          <SelectColumnsButton />
          <FilterButton />
        </TopToolbar>
      }
    >
      <DatagridConfigurable rowClick={"edit"}>
        <TextField source={channel.id} />
        <TextField source={channel.order} />
        <TextField source={channel.language} />
        <TextField source={channel.title} />
        <TextField source={channel.members} />
        <TextField source={channel.tags} />

        <TextField source={channel.status} />
        <TextField source={channel.type} />
        <ReferenceManyField
          source={channel.user_id}
          target={user.telegram_id}
          reference="users"
        >
          <SingleFieldList>
            <TextField source={user.first_name} fullWidth />
          </SingleFieldList>
        </ReferenceManyField>
        <ShowButton />
        <EditButton label="" />
        <DeleteButton label="" redirect={false} />
      </DatagridConfigurable>
    </List>
  );
};
export default ChannelsList;
