export function checkValidity(value, rules) {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.validEmail) {
    let regExp = /@\w+\.\w+/g;
    isValid = regExp.test(value) && isValid;
  }

  return isValid;
}
