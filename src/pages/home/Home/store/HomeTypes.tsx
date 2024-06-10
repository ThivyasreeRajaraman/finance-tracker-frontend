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