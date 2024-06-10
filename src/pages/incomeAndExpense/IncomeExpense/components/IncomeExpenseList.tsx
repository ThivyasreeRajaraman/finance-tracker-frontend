import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Card, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IncomeOrExpenseListAtom, IncomeExpenseFiltersAtom, CreateIncomeOrExpensePayloadAtom, TransactionTypeAtom } from '../store/IncomeExpenseAtoms';
import { createOrUpdateIncomeOrExpense, getIncomeOrExpenses } from '../store/IncomeExpenseSelectors';
import IncomeOrExpenseColumns from './IncomeExpenseColumns';
import { TransactionResponsePayloadType } from '../store/IncomeExpenseTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';
import { transactionTotalSelector } from 'pages/home/Home/store/HomeSelectors';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import { formatCurrency } from 'pages/generic/helpers/FormatHelpers';

interface IncomeOrExpenseListProps {
    onEdit?: (transaction: TransactionResponsePayloadType) => void;
    onDelete?: (transaction: TransactionResponsePayloadType) => void;
    transactionType: string;
}

const IncomeOrExpenseList = ({ onEdit, onDelete, transactionType }: IncomeOrExpenseListProps) => {
    const [incomeOrExpenses, setIncomeOrExpenses] = useRecoilState(IncomeOrExpenseListAtom);
    const [transactionTypeState, setTransactionTypeState] = useRecoilState(TransactionTypeAtom);
    const navigate = useNavigate();
    const [incomeOrExpensesData, setIncomeOrExpensesData] = useRecoilState(IncomeExpenseFiltersAtom);
    const [incomeOrExpensePayload, setIncomeOrExpensePayload] = useRecoilState(CreateIncomeOrExpensePayloadAtom);
    const createOrUpdateIncomeOrExpenseLoadable = useRecoilValueLoadable(createOrUpdateIncomeOrExpense);
    const transactionTotalLoadable = useRecoilValueLoadable(transactionTotalSelector);

    const { loading: transactionTotalLoading, error: transactionTotalError, data: transactionTotal } = getLoadableStateAndContents(transactionTotalLoadable);
    const [currPage, setCurrPage] = useState(1);


    const loadable = useRecoilValueLoadable(getIncomeOrExpenses);
    const { data, page, limit, totalCount } = loadable.contents;
    console.log("data:", data)

    useEffect(() => {
        console.log("loadable::")
        if (loadable.state === 'hasValue') {
            setIncomeOrExpenses(data);
        }
    }, [loadable, data, incomeOrExpensesData, setIncomeOrExpensePayload, setIncomeOrExpenses, setIncomeOrExpensePayload, createOrUpdateIncomeOrExpenseLoadable]);

    useEffect(() => {
        setTransactionTypeState({ transactionType });
    }, [transactionType, setTransactionTypeState]);

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setIncomeOrExpensesData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setIncomeOrExpensesData]);

    const handleEdit = (record: TransactionResponsePayloadType) => {
        console.log("rec::", record)
        navigate(`/${transactionTypeState.transactionType.toLowerCase()}/${record.id}/edit`);
    };

    const handleDelete = async (record: TransactionResponsePayloadType) => {
        try {
            const token = localStorage.getItem('token');
            await await apiClient(token).delete<DataResponseType>(`api/user/transaction/${record.id}`);
            message.success('Transaction deleted successfully');
            onDelete?.(record);
            setIncomeOrExpenses((prevData) => prevData.filter((transaction) => transaction.id !== record.id));
            setIncomeOrExpensesData((prevState) => ({
                ...prevState,
                page: '1',
            }));
        } catch (error) {
            console.error('Error deleting transaction:', error);
            message.error('Failed to delete transaction');
        }
    };

    const totalValue = transactionTotal?.[transactionType.toLowerCase()];

    return (
        <>
            <Card className='total-expense-card'>
                <h3>Total {transactionType}</h3>
                <p className={`total-amount ${transactionType.toLowerCase()}`}>
                    {totalValue !== undefined ? `${formatCurrency(totalValue)}` : 'Loading...'}
                </p>
            </Card>

            <Table
                columns={IncomeOrExpenseColumns(handleEdit, handleDelete)}
                dataSource={incomeOrExpenses}
                pagination={{
                    current: currPage,
                    pageSize: limit,
                    total: totalCount,
                    onChange: handlePageChange,
                }}
                rowKey="id"
            />
        </>
    );
};

export default IncomeOrExpenseList;

