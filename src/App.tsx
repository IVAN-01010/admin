// in src/admin/index.tsx
import { Admin, ListGuesser, Resource } from "react-admin";
import { supabaseDataProvider } from "./supabaseDataProvider";
import { supabase } from "./supabase";
import ChannelsList from "./components/channels/channelsList";
import ChannelEdit from "./components/channels/editChannel";
import { channel, dislike, like, report, user } from "./enums";
import i18Provider from "./i18provider";
import ReportsList from "./components/reports/reportsList";
import CreateReport from "./components/reports/createReport";
import UsersList from "./components/users/usersList";

const resources = {
  channels: Object.keys(channel),
  users: Object.keys(user),
  likes: Object.keys(like),
  dislikes: Object.keys(dislike),
  reports: Object.keys(report),
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
    <Resource name="reports" list={ReportsList} create={CreateReport} />
  </Admin>
);

export default App;
