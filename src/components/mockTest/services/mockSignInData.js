import { mockPermissions } from "../mockPermissions";

export const mockSignInData = {
  data: {
    result: {
      created: 1627276598,
      expires: 1627634943,
      modified: 1627548543,
      role: "user",
      status: 1,
      storage: null,
      token: "dGgB0-lLGG5GmjFgtr6t2nBFqgM05Nijq_YzzYdxVUk",
      user: {
        created: 1619760527,
        deleted: 0,
        email: "sourcefusepubnub@gmail.com",
        id: 572287,
        login_attempts: 0,
      },
      user_id: 572287,
      user_roles: {
        is_internal_admin: false,
        is_internal_operator: false,
        is_internal_viewer: false,
        roles: mockPermissions,
      },
    },
  },
  status: 200,
  statusText: "OK",
};

export default null;
