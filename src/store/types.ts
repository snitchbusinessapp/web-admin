import { EmailAuthSlice } from "./auth";
import { UISlice, UserActions, UserState } from "./slices";

export type UserSlice = UserState & UserActions;

export type StoreSlice = UserSlice & UISlice & { email: EmailAuthSlice };
