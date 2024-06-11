import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table,Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getLendBorrow,createOrUpdateLendBorrow } from '../store/LendBorrowSelectors';
import { LendBorrowFiltersAtom,LendBorrowAtom,CreateLendBorrowPayloadAtom } from '../store/LendBorrowAtoms';
import columns from './LendBorrowColumns';
import { LendBorrow } from '../store/LendBorrowTypes';
import apiClient from 'pages/generic/apiUtils/client';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';
import './style.css';

const { Option } = Select;

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
    const [filter, setFilter] = useState<'all' | 'lend' | 'borrow'>('all');

    

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


    const handleFilterChange = (value: 'all' | 'lend' | 'borrow') => {
        setLendBorrowData((prevState) => ({
            ...prevState,
            filter: value,
        }));
    };
    

    return (
        <>
            <Select<'all' | 'lend' | 'borrow'>  className='lendBorrowFilter'placeholder="Transaction type filter"  allowClear  onChange={handleFilterChange}>
                
                <Option value="lend">Lend</Option>
                <Option value="borrow">Borrow</Option>
            </Select>
            <Table
                columns={columns()}
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

