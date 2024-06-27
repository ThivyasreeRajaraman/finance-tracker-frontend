export type TransactionTotalType = {
  income: number,
  expense: number,
  lend: number,
  borrow: number,
  budget: number
};

export type ReminderMessageType = {
  reminders: string;
  id: number;
};

export type RemindersData = {
  Reminder: ReminderMessageType[];
};

export type TransactionTotalResponse = {
  borrow: number;
  budget: number;
  expense: number;
  income: number;
  lend: number;
}

export type TransformedData = {
  transaction_type: string;
  amount: number;
}

export type TransformedDataForCategory = {
  category: string;
  amount: number;
}

export type NotificationType = {
  actionDone: boolean;
}

export type ButtonClick = {
  clicked: boolean;
}

export type ChartFilterParamsType = {
  month: number;
  year:number;
}