import React from "react";
import {
  Edit,
  ImageField,
  ImageInput,
  ReferenceInput,
  ReferenceManyField,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";
import { channel, user } from "../../enums";

const ChannelEdit = () => (
  <Edit>
    <SimpleForm>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <ReferenceManyField
          source={channel.user_id}
          target={user.telegram_id}
          reference="users"
        >
          <SingleFieldList>
            <TextInput disabled source={user.first_name} />
          </SingleFieldList>
        </ReferenceManyField>
        <TextInput source={channel.type} />
        <TextInput source={channel.status} />
        <TextInput source={channel.members} />
      </div>

      <TextInput source={channel.order} fullWidth />
      <TextInput source={channel.link} fullWidth />
      <TextInput source={channel.title} fullWidth />
      <TextInput multiline source={channel.description} fullWidth />
      <TextInput multiline source={channel.tags} fullWidth />
    </SimpleForm>
  </Edit>
);
export default ChannelEdit;
