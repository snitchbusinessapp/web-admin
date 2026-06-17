const validateLength = (text: string) => !!text && text.trim().length >= 8;
const validateLowerCase = (text: string) => !!text && /[a-z]/.test(text);
const validateUpperCase = (text: string) => !!text && /[A-Z]/.test(text);
const validateSpecialChar = (text: string) =>
  !!text && /[^A-Za-z0-9]/.test(text);
export const PASSWORD_VALIDATIONS = [
  { label: "At least 8 characters", isValid: false, fn: validateLength },
  {
    label: "At least one uppercase letter (A-Z)",
    isValid: false,
    fn: validateUpperCase,
  },
  {
    label: "At least one lowercase letter (a-z)",
    isValid: false,
    fn: validateLowerCase,
  },
  {
    label: "At least one special character",
    isValid: false,
    fn: validateSpecialChar,
  },
];

export const isEmailValid = (email: string) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
