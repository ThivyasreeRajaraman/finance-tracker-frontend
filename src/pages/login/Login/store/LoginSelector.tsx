import { selector } from "recoil";
import { userData } from "./LoginAtoms";

export const isUserLoggedIn = selector({
    key: 'isUserLoggedIn',
    get: ({ get }) => {
      const user = get(userData);
      return user ? user.isLoggedIn : false;
    },
});

export const userNameSelector = selector({
    key: 'userNameSelector',
    get: ({ get }) => {
      const user = get(userData);
      return user ? user.name : '';
    },
});