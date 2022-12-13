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
import { user } from "../../enums";

const UsersList = () => (
  // @ts-ignore
  <List perPage={100}>
    <Datagrid>
      <TextField source={user.telegram_id} />
      <TextField source={user.first_name} />
      <TextField source={user.username} />
      <TextField source={user.language} />
      <TextField source={user.crypto} />
      <ShowButton />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);
export default UsersList;
