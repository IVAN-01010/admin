import React from "react";
import {
  Edit,
  ImageField,
  ImageInput,
  ReferenceInput,
  ReferenceManyField,
  SimpleForm,
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
        <TextInput source={channel.id} disabled />
        <TextInput source={channel.type} />
        <TextInput source={channel.status} />
        <TextInput source={channel.members} />
      </div>
      <ReferenceInput
        label="Owner"
        source={channel.user_id}
        reference={"users." + user.telegram_id}
      />
      <TextInput source={channel.link} fullWidth />
      <TextInput source={channel.title} fullWidth />
      <TextInput multiline source={channel.description} fullWidth />

      {/* <TextInput source={channel.user_id}/> */}
    </SimpleForm>
  </Edit>
);
export default ChannelEdit;
