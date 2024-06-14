import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Table,Select } from 'antd';
import { getLendBorrow,createLendBorrow } from '../store/LendBorrowSelectors';
import { LendBorrowFiltersAtom,LendBorrowAtom,CreateLendBorrowPayloadAtom } from '../store/LendBorrowAtoms';
import columns from './LendBorrowColumns';
import './style.css';

const { Option } = Select;



const LendBorrowList: React.FC= () => {
   
    const [lendBorrow, setLendBorrow] = useRecoilState(LendBorrowAtom);
    const [lendBorrowData, setLendBorrowData] = useRecoilState(LendBorrowFiltersAtom);
    const createLendBorrowLoadable = useRecoilValueLoadable(createLendBorrow);
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
    }, [loadable, data, lendBorrowData, lendBorrowPayload,setLendBorrow, setLendBorrowPayload, createLendBorrowLoadable, CreateLendBorrowPayloadAtom]);

    const handlePageChange = useCallback((page: number) => {
        setCurrPage(page);
        setLendBorrowData((prevState) => ({
            ...prevState,
            page: page.toString(),
        }));
    }, [setLendBorrowData]);


    const handleFilterChange = (value: 'all' | 'lend' | 'borrow'| undefined) => {
        setLendBorrowData((prevState) => ({
            ...prevState,
            filter: value || 'all',
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

