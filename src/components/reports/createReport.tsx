//CreatePost.jsx
import React from "react";
import {
  Create,
  ImageField,
  ImageInput,
  ReferenceField,
  SimpleForm,
  TextInput,
} from "react-admin";
import { channel, report } from "../../enums";
//

const CreateReport = () => (
  <Create>
    <SimpleForm>
      <TextInput source={report.id} />
      <TextInput multiline source={report.ad_competitor} />
      <ReferenceField source={report.channel_id} reference="channels" />
    </SimpleForm>
  </Create>
);
export default CreateReport;
