const ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/signin",
    LOGOUT: "auth/logout",
    SIGNUP: "auth/signup",
    details: "auth/details",
    verify_email: (token: string) => `/auth/verfiy-email?token=${token}`,
    resend_verification_mail: "auth/resend-verification-link",
    email_cooldown: (email: string) => `auth/email-cooldown/${email}`,
    email_verification_status: (email: string) =>
      `auth/email-verification-status/${email}`,
    forgot: "auth/forgot",
    reset_password: (token: string) => `auth/reset-password?token=${token}`,
  },
  users: {
    fetch_all: (queryString?: string) =>
      `users${queryString ? "?" + queryString : ""}`,
    create: "users",
    update: (id: string) => `users/${id}`,
    delete: (id: string) => `users/${id}`,
    block: (id: string) => `users/${id}/block`,
    unblock: (id: string) => `users/${id}/unblock`,
  },
  upload: "files",
  remove_file: (file_id: string) => `files/${file_id}`,
  account: {
    update_details: "account",
    update_password: "account/update-password",
  },
};

export default ENDPOINTS;
