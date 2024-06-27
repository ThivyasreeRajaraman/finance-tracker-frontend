import { ProfileEditType, ProfileFormType } from "./profileType";
import { atom } from "recoil";

export const EditUserProfileAtom = atom<ProfileEditType>({
    key: 'editProfileAtom',
    default: {
      name: undefined,
    }
  });

export const UserProfileAtom = atom<ProfileFormType>({
    key: 'UserProfileAtom',
    default: {
      name: undefined,
      email: undefined,
      default_currency: undefined,
    },
  });