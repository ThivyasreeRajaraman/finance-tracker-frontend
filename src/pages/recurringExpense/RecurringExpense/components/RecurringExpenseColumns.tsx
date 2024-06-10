import { formatDate, formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { Popover, Button, Divider, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { RecurringExpense } from '../store/RecurringExpenseTypes';
import { ColumnProps } from 'antd/es/table';
import './style.css'

interface ColumnPropsWithActions extends ColumnProps<RecurringExpense> {
    render?: (text: any, record: RecurringExpense, index: number) => React.ReactNode;
}

const columns = (handleEdit: (record: RecurringExpense) => void, handleDelete: (record: RecurringExpense) => void, handleActivate: (record: any) => void): ColumnPropsWithActions[] => [
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'table-content-centered',
        render: (createdAt: string, record: any) => {
            return (
                <Space direction="vertical">
                    {record.active ? null : <div className="ribbon">Deactivated</div>}
                    <div>{formatDate(createdAt)}</div>
                </Space>
            );
        },
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
                        {record.active ? (
                            <Button  type="link" className="edit-button" onClick={() => handleEdit(record)}>
                                Edit
                            </Button>
                        ) : (
                            <Button type="link" className="activate-button" onClick={() => handleActivate(record)}>
                                Activate
                            </Button>
                        )}
                        <Divider type="horizontal" />
                        <Button type="link" className="delete-button" onClick={() => handleDelete(record)}>Delete</Button>
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
