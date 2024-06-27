import { CreateBudgetFormType } from "./BudgetTypes";

export const mapBudgetDataToFormType = (budgetData: any): CreateBudgetFormType => ({
  budgets: budgetData.map((budget: any) => ({
    category_name: budget.category_name,
    amount: budget.amount,
    threshold: budget.threshold,
}))
  });

export const convertBudgetDataToFormType = (budgetData: any): CreateBudgetFormType => ({
  budgets: budgetData.map((budget: any) => ({
    category_name: budget.category_name,
    amount: budget.amount,
    threshold: budget.threshold,
  }))
});