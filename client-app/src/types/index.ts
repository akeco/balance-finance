type CommonFields = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type Total = {
  date: number;
  balance: number;
};

export type Category = {
  name: string;
  subjects: Subject[];
  total?: Total[];
} & CommonFields;

export type Subject = {
  name: string;
  months?: Month[];
} & CommonFields;

export type Month = {
  date: number;
  transactions?: Transaction[];
  total?: number;
} & CommonFields;

export type Transaction = {
  company: string;
  description: string;
  balance: number;
} & CommonFields;
