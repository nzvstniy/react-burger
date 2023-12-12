import { RootState } from "../../store";

export const getProfileOrderFeed = (state: RootState) =>
  state.profileOrderFeed.orders;