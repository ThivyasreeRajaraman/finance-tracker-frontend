import { formatDate, formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import { Popover, Button, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { LendBorrow } from '../store/LendBorrowTypes';
import { ColumnProps } from 'antd/es/table';

interface ColumnPropsWithActions extends ColumnProps<LendBorrow> {
    render?: (text: any, record: LendBorrow, index: number) => React.ReactNode;
}

const columns = (): ColumnPropsWithActions[] => [
    {
        title: 'Transaction Partner',
        dataIndex: 'transactionPartner',
        key: 'transactionPartner',
        className: 'table-content-centered',
        render: (transactionPartner: string) => transactionPartner,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        className: 'table-content-centered',
        render: (amount: number) => formatCurrency(amount),
    },
    {
        title: 'Transaction Type',
        dataIndex: 'transactionType',
        key: 'transactionType',
        className: 'table-content-centered',
        render: (transactionType: string) => transactionType,
    },
    {
        title: 'Payment Due Date',
        dataIndex: 'paymentDueDate',
        key: 'paymentDueDate',
        className: 'table-content-centered',
        render: (paymentDueDate: string) => formatDate(paymentDueDate),
    }
];

export default columns;
