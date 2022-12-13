import React, { useEffect, useState } from "react";
import {
  Datagrid,
  Edit,
  ImageField,
  ImageInput,
  ListContextProvider,
  ReferenceArrayField,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  Show,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  useList,
  useRecordContext,
} from "react-admin";
import { channel, reportList as report, user } from "../../enums";
import { dataSchema, reportsAdminSchema } from "../../supabaseDataProvider";
const InfoList = ({ setImage }) => {
  const record = useRecordContext<reportsAdminSchema>();
  const listContext = useList({ data: record.info });
  const info = report.info;
  return (
    <ListContextProvider value={listContext}>
      <Datagrid
        rowClick={"toggleSelection"}
        onToggleItem={(id) => {
          const data = record.info.filter((i) => i.id === id).shift();
          if (!!data || data.blob_url) {
            setImage(data);
          }
        }}
      >
        <ReferenceManyField
          source={info.user_id}
          target={user.telegram_id}
          reference="users"
        >
          <SingleFieldList>
            <TextField source={user.first_name} />
          </SingleFieldList>
        </ReferenceManyField>
        <TextField source={info.report_type} />
      </Datagrid>
    </ListContextProvider>
  );
};
const CustomImageGrid = ({ setImage, imageData }) => {
  useEffect(() => {
    // console.log(imageData);
  }, [imageData]);
  return (
    <div
      style={{
        padding: "1rem 3rem",
        flex: 1,
      }}
    >
      <img
        src={imageData.blob_url}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};
const ReportShow = () => {
  const [imageData, setImage] = useState<Partial<dataSchema>>({});

  return (
    <Show>
      <SimpleForm>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <ReferenceField source={report.channel_id} reference="channels">
              <TextField source={channel.title} fullWidth />
              <br />
              <br />
              <TextField source={channel.description} fullWidth />
            </ReferenceField>

            <InfoList setImage={setImage} />
          </div>
          {imageData.blob_url && (
            <CustomImageGrid imageData={imageData} setImage={setImage} />
          )}
        </div>
      </SimpleForm>
    </Show>
  );
};
export default ReportShow;
