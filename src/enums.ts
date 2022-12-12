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
  none_exists: "none_exists",
  child_pornography: "child_pornography",
  drugs: "drugs",
  terrorist: "terrorist",
  language_error: "language_error",
  theft: "theft",
  occupy_screen: "occupy_screen",
  ad_competitor: "ad_competitor",
  other: "other",
  channel_id: "channel_id",
  scam: "scam",
  pull_fans: "pull_fans",
  personal_link: "personal_link",
  spam: "spam",
};
const like = {
  user_id: "user_id",
  channel_id: "channel_id",
};
const dislike = like;
export { channel, user, like, dislike, report };
