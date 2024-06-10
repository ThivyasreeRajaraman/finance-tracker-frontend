import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getLendBorrow,createOrUpdateLendBorrow } from '../store/LendBorrowSelectors';
import { LendBorrowFiltersAtom,LendBorrowAtom,CreateLendBorrowPayloadAtom } from '../store/LendBorrowAtoms';
import columns from './LendBorrowColumns';
import { LendBorrow } from '../store/LendBorrowTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';

interface LendBorrowListProps {
    onEdit?: (lendBorrow: LendBorrow) => void;
    onDelete?: (lendBorrow: LendBorrow) => void;
}

const LendBorrowList: React.FC<LendBorrowListProps> = ({ onEdit, onDelete }) => {
   
    const [lendBorrow, setLendBorrow] = useRecoilState(LendBorrowAtom);
    const navigate = useNavigate();
    const [lendBorrowData, setLendBorrowData] = useRecoilState(LendBorrowFiltersAtom);
    const createOrUpdateLendBorrowLoadable = useRecoilValueLoadable(createOrUpdateLendBorrow);
    const [lendBorrowPayload, setLendBorrowPayload] = useRecoilState(CreateLendBorrowPayloadAtom);
    const [currPage, setCurrPage] = useState(1);

    

    console.log("step1")
    const loadable = useRecoilValueLoadable(getLendBorrow);
    const { data, page, limit, totalCount } = loadable.contents;

    useEffect(() => {
        console.log("loadable::")
        if (loadable.state === 'hasValue') {
            setLendBorrow(data);
        }
    }, [loadable, data, lendBorrowData, lendBorrowPayload,setLendBorrow, setLendBorrowPayload, createOrUpdateLendBorrowLoadable, CreateLendBorrowPayloadAtom]);


    

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setLendBorrowData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setLendBorrowData]);

    const handleEdit = (record: LendBorrow) => {
        console.log("rec::",record)
        navigate(`/transaction/${record.id}/edit`);
    };

    const handleDelete = async (record: LendBorrow) => {
        try {
            const token = localStorage.getItem('token');
            await apiClient(token).delete<DataResponseType>(`api/user/transaction/${record.id}`); 
            message.success('Transaction deleted successfully');
            onDelete?.(record); // Trigger the onDelete callback to update the UI
        } catch (error) {
            console.error('Error deleting transaction:', error);
            message.error('Failed to delete transaction');
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

export default LendBorrowList;

