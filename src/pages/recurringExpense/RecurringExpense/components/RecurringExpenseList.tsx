import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRecurringExpenses, createOrUpdateRecurringExpense } from '../store/RecurringExpenseSelectors';
import { RecurringExpenseFiltersAtom, RecurringExpensesAtom, CreateRecurringExpensePayloadAtom } from '../store/RecurringExpenseAtoms';
import columns from './RecurringExpenseColumns';
import { RecurringExpense } from '../store/RecurringExpenseTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';
import { modalVisibleState } from 'pages/home/Home/store/HomeAtoms';

interface RecurringExpenseListProps {
    onEdit?: (expense: RecurringExpense) => void;
    onDelete?: (expense: RecurringExpense) => void;
    onActivate?: (expense: RecurringExpense) => void;
}

const RecurringExpenseList = ({ onEdit, onDelete, onActivate }: RecurringExpenseListProps) => {

    const [recurringExpenses, setRecurringExpenses] = useRecoilState(RecurringExpensesAtom);
    const navigate = useNavigate();
    const [recurringExpensesData, setRecurringExpensesData] = useRecoilState(RecurringExpenseFiltersAtom);
    const [recurringExpensePayload, setRecurringExpensePayload] = useRecoilState(CreateRecurringExpensePayloadAtom);
    const createOrUpdateRecurringExpenseLoadable = useRecoilValueLoadable(createOrUpdateRecurringExpense);
    const [currPage, setCurrPage] = useState(1);
    const [modalVisible, setModalVisible] = useRecoilState(modalVisibleState);


    const loadable = useRecoilValueLoadable(getRecurringExpenses);
    const { data, page, limit, totalCount } = loadable.contents;
    console.log("data:", data)

    useEffect(() => {
        console.log("loadable::")
        if (loadable.state === 'hasValue') {
            setRecurringExpenses(data);
        }
    }, [loadable, setModalVisible, modalVisible, data, recurringExpensesData, recurringExpensePayload, setRecurringExpenses, setRecurringExpensePayload, createOrUpdateRecurringExpenseLoadable, CreateRecurringExpensePayloadAtom]);

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setRecurringExpensesData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setRecurringExpensesData, setRecurringExpenses]);

    const handleEdit = (record: RecurringExpense) => {
        console.log("rec::", record)
        navigate(`/recurringExpense/${record.id}/edit`);
    };

    const handleDelete = async (record: RecurringExpense) => {
        try {
            const token = localStorage.getItem('token');
            await await apiClient(token).delete<DataResponseType>(`api/user/recurringExpense/${record.id}`);
            message.success('Recurring expense deleted successfully');
            onDelete?.(record);
            setRecurringExpenses((prevData) => prevData.filter((expense) => expense.id !== record.id));
            setRecurringExpensesData((prevState) => ({
                ...prevState,
                page: '1',
            }));
            
        } catch (error) {
            console.error('Error deleting recurring expense:', error);
            message.error('Failed to delete recurring expense');
        }
    };

    const handleActivate = async (record: RecurringExpense) => {
        try {
            console.log("reccccc:",record)
            const token = localStorage.getItem('token');
            await await apiClient(token).put<DataResponseType>(`api/user/recurringExpense/${record.id}`, { active: true });
            message.success('Recurring expense activated successfully');
            onActivate?.(record);
            setModalVisible(false)
            setRecurringExpenses((prevData) => {
                const updatedExpenses = prevData.map((expense) =>
                    expense.id === record.id ? { ...expense, active: true } : expense
                );
            
                console.log("Updated expenses:", updatedExpenses);
            
                return updatedExpenses;
            });
            setRecurringExpensesData((prevState) => ({
                ...prevState,
                page: '1',
            }));
        } catch (error) {
            console.error('Error activating recurring expense:', error);
            message.error('Failed to activate recurring expense');
        }
    };


    return (
        <>
            <Table
                columns={columns(handleEdit, handleDelete, handleActivate)}
                dataSource={data}
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

export default RecurringExpenseList;

