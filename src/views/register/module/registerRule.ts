const ValidConst={
    phone: /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/,
    password:'',
    confirmPassword:''
}

export const REGISTER_RULE = [
  {
    key: "userName",
    require: true,
    errMsg: ["First name is required."],
  },
  {
    key: "phoneNumber",
    require: true,
    regExp: ValidConst.phone,
    errMsg: [
      "Phone number is required.",
      "Enter a valid Phone. example: 13101227768",
    ],
  },
  {
    key: "password",
    require: true,
    regExp: ValidConst.password,
    errMsg: [
      "password is required.",
      "Enter a valid password. example: 1234@AB",
    ],
  },
  {
    key: "confirmPassword",
    require: true,
    regExp: ValidConst.confirmPassword,
    errMsg: [
      "confirmPassword is required.",
      "The password entered twice is not the same",
    ],
  },
];
