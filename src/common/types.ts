// FROM https://github.com/sparcs-kaist/biseo-backend/blob/develop/src/common/types.ts

export interface SSOUser {
  uid: string;
  sid: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: string;
  flags: string[];
  facebook_id: unknown;
  twitter_id: unknown;
  kaist_id: unknown;
  kaist_info: string;
  kaist_info_time: string;
  sparcs_id: string;
  ku_kname: string;
}

export type TokenPayload = Pick<SSOUser, "uid" | "sparcs_id" | "ku_kname"> & {
  isAdmin: boolean,
};

export interface SessionUser {
  sid: string;
  sparcs_id: string;
}
