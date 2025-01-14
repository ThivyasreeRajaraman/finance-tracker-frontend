export type CreateBudgetProps = {
    budgetId?: string;
}

export type CreateBudgetFormType = {
    budgets: {
        category_name?: string | undefined;
        amount: number | null;
        threshold: number | null;
        currency:string;
    }[];
};

export type CreateBudgetPayloadType = {
    budgets: {
        category_name?: string;
        amount: number | null;
        threshold: number | null;
        currency:string;
    }[];
};

export interface Budget {
    id: number;
    userId: number;
    categoryId: number;
    category: string;
    amount: number;
    threshold:number;
    createdAt: string;
    updatedAt: string;
    currency: string;
  }
  
