import { Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  SingleFieldList,
  TextField,
  useListContext,
  useRecordContext,
} from "react-admin";
import { channel, user } from "../../enums";

const ChannelsList = () => {
  return (
    // @ts-ignore
    <List perPage={100}>
      <Datagrid>
        <TextField source={channel.id} />
        <TextField source={channel.title} />
        <TextField source={channel.members} />
        <TextField source={channel.status} />
        <TextField source={channel.type} />
        <TextField source={channel.user_id} />
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
      </Datagrid>
    </List>
  );
};
export default ChannelsList;
