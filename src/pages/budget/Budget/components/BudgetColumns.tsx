import { formatDate, formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { Popover, Button, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Budget } from '../store/BudgetTypes';
import { ColumnProps } from 'antd/es/table';

interface ColumnPropsWithActions extends ColumnProps<Budget> {
    render?: (text: any, record: Budget, index: number) => React.ReactNode;
}

const columns = (handleEdit: (record: Budget) => void, handleDelete: (record: Budget) => void): ColumnPropsWithActions[] => [
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'table-content-centered',
        render: (date: string) => formatDate(date),
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        className: 'table-content-centered',
        render: (category: string) => category,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        className: 'table-content-centered',
        render: (amount: number) => formatCurrency(amount),
    },
    {
        title: 'Threshold',
        dataIndex: 'threshold',
        key: 'threshold',
        className: 'table-content-centered',
        render: (threshold: number) => formatCurrency(threshold),
    },
    {
        title: '',
        key: 'actions',
        render: (_, record: Budget) => (
            <Popover
                content={
                    <>
                        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                        <Divider type="horizontal" />
                        <Button type="link" onClick={() => handleDelete(record)}>Delete</Button>
                    </>
                }
                trigger="click"
                placement="left"
            >
                <Button icon={<MoreOutlined />} />
            </Popover>
        ),
        className: 'table-content-centered',
    },
];

export default columns;
