const ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/signin",
    LOGOUT: "auth/logout",
    SIGNUP: "auth/signup",
    details: "auth/details",
    verify_email: (token: string) => `/auth/verfiy-email?token=${token}`,
    resend_verification_mail: "auth/resend-verification-link",
    forgot: "auth/forgot",
    reset_password: (token: string) => `auth/reset-password?token=${token}`,
  },
  admin: {},
  upload: "files",
  remove_file: (file_id: string) => `files/${file_id}`,
  account: {
    update_details: "account",
    update_password: "account/update-password",
  },
};

export default ENDPOINTS;
