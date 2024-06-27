import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getBudgets } from '../store/BudgetSelectors';
import { BudgetFiltersAtom,BudgetAtom } from '../store/BudgetAtoms';
import columns from './BudgetColumns';
import { Budget } from '../store/BudgetTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';

interface BudgetListProps {
    onEdit?: (budget: Budget) => void;
    onDelete?: (budget: Budget) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ onEdit, onDelete }) => {
   
    var setBudgetPayload = useSetRecoilState(BudgetAtom)
    const navigate = useNavigate();
    const [budgetsData, setBudgetsData] = useRecoilState(BudgetFiltersAtom);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        setBudgetPayload(null);
    }, [])
    
    const loadable = useRecoilValueLoadable(getBudgets);
    const { data, page, limit, totalCount } = loadable.contents;

    useEffect(() => {
        if (loadable.state === 'hasValue') {
            console.log("dataaa:",data)
            setBudgetPayload(data);
        }
    }, [loadable, setBudgetPayload, data]);

    

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setBudgetsData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setBudgetsData]);

    const handleEdit = (record: Budget) => {
        console.log("rec::",record)
        navigate(`/budget/${record.id}/edit`);
    };

    const handleDelete = async (record: Budget) => {
        try {
            const token = localStorage.getItem('token');
            await await apiClient(token).delete<DataResponseType>(`api/user/budget/${record.id}`); 
            message.success('Budget deleted successfully');
            onDelete?.(record); // Trigger the onDelete callback to update the UI
        } catch (error) {
            console.error('Error deleting budget:', error);
            message.error('Failed to delete budget');
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

export default BudgetList;

