import { Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  TextField,
  useListContext,
} from "react-admin";
import { channel } from "../../enums";
const Aside = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) return null;
  return (
    <div style={{ width: 200, margin: "1em" }}>
      <Typography variant="h6">Posts stats</Typography>
      <Typography variant="body2">Total views:</Typography>
    </div>
  );
};
const ChannelsList = () => (
  // @ts-ignore
  <List perPage={100} aside={Aside}>
    <Datagrid>
      <TextField source={channel.id} />
      <TextField source={channel.title} />
      <TextField source={channel.members} />
      <TextField source={channel.status} />
      <TextField source={channel.type} />
      <TextField source={channel.user_id} />
      <ShowButton />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);
export default ChannelsList;
