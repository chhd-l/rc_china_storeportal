export const fansDetailSource = {
  id: "@id",
  account: "Royal Canin",
  avatar: "",
  name: "@cname",
  "sex|1": ["Female", "Male"],
  "isMember|1": [true, false],
  followTime: "@datetime",
  status: "Normal",
  language: "zh",
  country: "@country",
  province: "@province",
  city: "@city",
  openId: "@id",
  unionId: "@id",
  comment: "",
  qrCode: "",
};

export const fansDetailListSource = {
  "array|6": [fansDetailSource],
};
