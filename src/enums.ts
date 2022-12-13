const channel = {
  id: "id",
  user_id: "user_id",
  channel_id: "channel_id",
  type: "type",
  title: "title",
  description: "description",
  members: "members",
  link: "link",
  status: "status",
  language: "language",
  tags: "tags",
};
const user = {
  created_at: "created_at",
  crypto: "crypto",
  language: "language",
  amount: "amount",
  orders: "orders",
  username: "username",
  first_name: "first_name",
  tags: "tags",
  telegram_id: "telegram_id",
};
const report = {
  id: "id",
  user_id: "user_id",
  channel_id: "channel_id",
  report_type: "report_type",
  blob_url: "blob_url",
};
const reportList = {
  id: "id",
  info: {
    id: "id",
    user_id: "user_id",
    channel_id: "channel_id",
    report_type: "report_type",
    blob_url: "blob_url",
  },
  channel_id: "channel_id",
  none_exists: "none_exists",
  personal_link: "personal_link",
  scam: "scam",
  child_pornography: "child_pornography",
  drugs: "drugs",
  terrorist: "terrorist",
  language_error: "language_error",
  spam: "spam",
  theft: "theft",
  occupy_screen: "occupy_screen",
  ad_competitor: "ad_competitor",
  disrupting_rankings: "disrupting_rankings",
  pull_fans: "pull_fans",
  other: "other",
};
export type report_type =
  | "scam"
  | "none_exists"
  | "personal_link"
  | "scam"
  | "child_pornography"
  | "drugs"
  | "terrorist"
  | "language_error"
  | "spam"
  | "theft"
  | "occupy_screen"
  | "ad_competitor"
  | "disrupting_rankings"
  | "pull_fans"
  | "other";

const report_types: { [report in report_type]: report_type } = {
  none_exists: "none_exists",
  personal_link: "personal_link",
  scam: "scam",
  child_pornography: "child_pornography",
  drugs: "drugs",
  terrorist: "terrorist",
  language_error: "language_error",
  spam: "spam",
  theft: "theft",
  occupy_screen: "occupy_screen",
  ad_competitor: "ad_competitor",
  disrupting_rankings: "disrupting_rankings",
  pull_fans: "pull_fans",
  other: "other",
};
const like = {
  user_id: "user_id",
  channel_id: "channel_id",
  id: "id",
};
const dislike = like;
export { channel, user, like, dislike, report, reportList };
