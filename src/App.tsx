// in src/admin/index.tsx
import { Admin, Resource } from "react-admin";
import { supabaseDataProvider } from "./supabaseDataProvider";
import { supabase } from "./supabase";
import ChannelsList from "./components/channels/channelsList";
import ChannelEdit from "./components/channels/editChannel";
import { channel, dislike, like, report, user } from "./enums";
import i18Provider from "./i18provider";

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
      recordRepresentation={(record) =>
        `${record[user.first_name]}-${record[user.telegram_id]}}`
      }
    />
  </Admin>
);

export default App;
