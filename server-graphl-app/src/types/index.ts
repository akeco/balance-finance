export type Transaction = { id: string; balance: number; company: string; description: string; createdAt: number; updatedAt: number };
export type Month = { id: string; date: number; createdAt: number; updatedAt: number; transactions: Transaction[]; total: number; subject: Subject };
export type Subject = { id: string; name: string; createdAt: number; updatedAt: number; months: Month[]; category: Category };
export type Category = { id: string; name: string; createdAt: number; updatedAt: number; subjects: Subject[]; total?: Total[] };
export type Total = { date: number; balance: number };

export type TransactionArgs = {
  monthId: string;
  subjectId: string;
  categoryId: string;
  transactionId: string;
};
