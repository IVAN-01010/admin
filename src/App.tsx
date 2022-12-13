// in src/admin/index.tsx
import { Admin, Resource } from "react-admin";
import { supabaseDataProvider } from "./supabaseDataProvider";
import { supabase } from "./supabase";
import ChannelsList from "./components/channels/channelsList";
import ChannelEdit from "./components/channels/editChannel";
import { channel, dislike, like, report, user } from "./enums";
import i18Provider from "./i18provider";
import ReportsList from "./components/reports/reportsList";
import UsersList from "./components/users/usersList";
import ReportShow from "./components/reports/showReport";
interface ResourceOptions {
  table?: string;
  primaryKey?: string;
  fields: string[];
  fullTextSearchFields?: string[];
}

const resources: { [x: string]: ResourceOptions | string[] } = {
  channels: {
    fields: Object.keys(channel),
    primaryKey: channel.id,
    fullTextSearchFields: [channel.title, channel.description, channel.tags],
  },
  users: {
    fields: Object.keys(user),
    primaryKey: user.telegram_id,
    table: "users",
  },
  likes: {
    fields: Object.keys(like),
  },
  dislikes: {
    fields: Object.keys(dislike),
  },
  reports: {
    fields: Object.keys(report),
    primaryKey: report.id,
    table: "reports",
  },
};

const dummyI18nProvider = {
  translate: (key) => key,
  changeLocale: (locale) => Promise.resolve(),
  getLocale: () => "en",
};
export const dataProvider = supabaseDataProvider(supabase, resources);

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18Provider}>
    <Resource name="channels" list={ChannelsList} edit={ChannelEdit} />
    <Resource
      name="users"
      recordRepresentation={user.telegram_id}
      list={UsersList}
    />
    <Resource name="reports" list={ReportsList} show={ReportShow} />
  </Admin>
);

export default App;
