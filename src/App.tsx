// in src/admin/index.tsx
import {
  Admin,
  Resource,
  defaultTheme,
  RaThemeOptions,
  usePermissions,
  useAuthenticated,
} from "react-admin";
import { supabaseDataProvider } from "./supabaseDataProvider";
import { supabase } from "./supabase";
import ChannelsList from "./components/channels/channelsList";
import ChannelEdit from "./components/channels/editChannel";
import { channel, dislike, like, report, user } from "./enums";
import i18Provider from "./i18provider";
import ReportsList from "./components/reports/reportsList";
import UsersList from "./components/users/usersList";
import ReportShow from "./components/reports/showReport";
import { FirebaseAuthProvider } from "react-admin-firebase";
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
export const authProvider = FirebaseAuthProvider(
  {
    apiKey: "AIzaSyAJtieVAzOw-n0M4b6D7cDOcaq83ThCYc8",
    authDomain: "wesam70e.firebaseapp.com",
    projectId: "wesam70e",
    storageBucket: "wesam70e.appspot.com",
    messagingSenderId: "855163308",
    appId: "1:855163308:web:71f8d0404f4c95f086fa09",
  },
  {}
);
const theme: RaThemeOptions = {
  ...defaultTheme,
  palette: {
    mode: "dark", // Switching the dark mode on is a single property value change.
  },
};
/**
 * user permissions example
 {
    "iss": "https://securetoken.google.com/{projectName}",
    "aud": "{projectName}",
    "auth_time": 1672151583,
    "user_id": "BUBxXkMP6NRQLbRsO5Y5SRW7uQS2",
    "sub": "BUBxXkMP6NRQLbRsO5Y5SRW7uQS2",
    "iat": 1672151583,
    "exp": 1672155183,
    "email": "test@email.com",
    "email_verified": false,
    "firebase": {
        "identities": {
            "email": [
                "test@email.com"
            ]
        },
        "sign_in_provider": "password"
    }
}
 */
interface userPermissions {
  iss: string; // url
  aud: string;
  auth_time: number; // same as iat
  user_id: string; // unique user id
  sub: string; // unique user id
  iat: number;
  exp: number;
  email: string; //email
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: "password"; // sign in type
  };
}
const App = () => (
  <Admin
    theme={theme}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18Provider}
    requireAuth
  >
    {(permissions: userPermissions) => (
      <>
        <Resource name="channels" list={ChannelsList} edit={ChannelEdit} />
        {permissions.email.includes("admin") && (
          <Resource
            name="users"
            recordRepresentation={user.telegram_id}
            list={UsersList}
          />
        )}

        <Resource name="reports" list={ReportsList} show={ReportShow} />
      </>
    )}
  </Admin>
);
const Res = () => {
  useAuthenticated();
  return [];
};

export default App;
