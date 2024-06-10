import { formatDate, formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { Popover, Button, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { RecurringExpense } from '../store/RecurringExpenseTypes';
import { ColumnProps } from 'antd/es/table';

interface ColumnPropsWithActions extends ColumnProps<RecurringExpense> {
    render?: (text: any, record: RecurringExpense, index: number) => React.ReactNode;
}

const columns = (handleEdit: (record: RecurringExpense) => void, handleDelete: (record: RecurringExpense) => void): ColumnPropsWithActions[] => [
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
        title: 'Next Expense Date',
        dataIndex: 'nextExpenseDate',
        key: 'nextExpenseDate',
        className: 'table-content-centered',
        render: (date: string) => formatDate(date),
    },
    {
        title: '',
        key: 'actions',
        render: (_, record: RecurringExpense) => (
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
