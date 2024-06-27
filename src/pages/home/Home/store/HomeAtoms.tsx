import { atom } from 'recoil';
import { ChartFilterParamsType, TransactionTotalType } from './HomeTypes';
import { ReminderMessageType, NotificationType } from './HomeTypes';

export const transactionTotalAtom = atom<TransactionTotalType>({
  key: 'transactionTotal',
  default: {
    income: 0,
    expense: 0,
    lend: 0,
    borrow: 0,
    budget: 0
  }
});

export const modalVisibleState = atom<boolean>({
  key: 'modalVisibleState',
  default: false,
});

export const remindersAtom = atom<ReminderMessageType[]>({
  key: 'remindersAtom',
  default: [],
});

export const NotificationAtom = atom<NotificationType>({
  key: 'notificationAtom',
  default: {
    actionDone: false
  }
})

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export const ChartFilterParamsAtom = atom<ChartFilterParamsType>({
  key: 'notificationAtom',
  default: {
    month: currentMonth,
    year: currentYear,
  }
})