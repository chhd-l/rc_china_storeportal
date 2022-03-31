const validForm = ({ RULE, data }: any) => {
  let errMsg = ''
  for (let key in data) {
    const matchedRule = RULE.filter((r: any) => r.key === key)[0]
    const value = data[key]
    if (matchedRule) {
      if (matchedRule.require && !value) {
        errMsg = matchedRule.errMsg[0]
      } else if (
        matchedRule.require &&
        matchedRule.regExp &&
        !matchedRule.regExp.test(value)
      ) {
        errMsg = matchedRule.errMsg[1]
      }
      if (errMsg) {
        break
      }
    }
  }
  return errMsg
}

export default validForm
