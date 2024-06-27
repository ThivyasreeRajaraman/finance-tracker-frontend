import { formatDate, formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { Popover, Button, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { TransactionResponsePayloadType } from '../store/IncomeExpenseTypes';
import { ColumnProps } from 'antd/es/table';

interface IncomeOrExpenseColumnPropsWithActions extends ColumnProps<TransactionResponsePayloadType> {
    render?: (text: any, record: TransactionResponsePayloadType, index: number) => React.ReactNode;
}

const IncomeOrExpenseColumns = (handleEdit: (record: TransactionResponsePayloadType) => void, handleDelete: (record: TransactionResponsePayloadType) => void): IncomeOrExpenseColumnPropsWithActions[] => [
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
        render: (amount: number, record: TransactionResponsePayloadType) => (
            <>
                {formatCurrency(amount, record.currency)}
            </>
        ),
    },
    {
        title: '',
        key: 'actions',
        render: (_, record: TransactionResponsePayloadType) => (
            <Popover
                content={
                    <>
                        <Button type="link" className="edit-button" onClick={() => handleEdit(record)}>Edit</Button>
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

export default IncomeOrExpenseColumns;
