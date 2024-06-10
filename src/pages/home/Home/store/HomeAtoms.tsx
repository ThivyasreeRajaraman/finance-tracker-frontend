import { atom } from 'recoil';
import { TransactionTotalType } from './HomeTypes';

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