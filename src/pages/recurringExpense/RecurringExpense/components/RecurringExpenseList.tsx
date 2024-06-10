import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRecurringExpenses } from '../store/RecurringExpenseSelectors';
import { RecurringExpenseFiltersAtom, RecurringExpensesAtom } from '../store/RecurringExpenseAtoms';
import columns from './RecurringExpenseColumns';
import { RecurringExpense } from '../store/RecurringExpenseTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';

interface RecurringExpenseListProps {
    onEdit?: (expense: RecurringExpense) => void;
    onDelete?: (expense: RecurringExpense) => void;
}

const RecurringExpenseList: React.FC<RecurringExpenseListProps> = ({ onEdit, onDelete }) => {
   
    var setRecurringExpensePayload = useSetRecoilState(RecurringExpensesAtom)
    const navigate = useNavigate();
    const [recurringExpensesData, setRecurringExpensesData] = useRecoilState(RecurringExpenseFiltersAtom);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        setRecurringExpensePayload(null);
    }, [])
    
    const loadable = useRecoilValueLoadable(getRecurringExpenses);
    const { data, page, limit, totalCount } = loadable.contents;

    useEffect(() => {
        if (loadable.state === 'hasValue') {
            console.log("dataaa:",data)
            setRecurringExpensePayload(data);
        }
    }, [loadable, setRecurringExpensePayload, data]);

    

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setRecurringExpensesData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setRecurringExpensesData]);

    const handleEdit = (record: RecurringExpense) => {
        console.log("rec::",record)
        navigate(`/recurringExpense/${record.id}/edit`);
    };

    const handleDelete = async (record: RecurringExpense) => {
        try {
            const token = localStorage.getItem('token');
            await await apiClient(token).delete<DataResponseType>(`api/user/recurringExpense/${record.id}`); 
            message.success('Recurring expense deleted successfully');
            onDelete?.(record); // Trigger the onDelete callback to update the UI
        } catch (error) {
            console.error('Error deleting recurring expense:', error);
            message.error('Failed to delete recurring expense');
        }
    };
    

    return (
        <>
            <Table
                columns={columns(handleEdit, handleDelete)}
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

