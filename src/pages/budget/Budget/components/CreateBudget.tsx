import { Form, Input, message, Select, Space,Row,Col,Modal,Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { fetchCategoriesSelector,createOrUpdateBudget } from '../store/BudgetSelectors';
import { useRecoilValueLoadable, useRecoilState,useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { budgetIdState, CreateBudgetPayloadAtom,formState } from '../store/BudgetAtoms';
import { budgetDataSelector } from '../store/BudgetSelectors';
import { getLoadableStateAndContents } from 'pages/generic/helpers/LoadableHelper';
import GenericButton from 'pages/generic/components/Button/Button';
import { FORM_RULE } from 'pages/generic/helpers/const';
import { DataResponseType } from 'pages/generic/apiUtils/apiTypes';

import { CreateBudgetFormType,CreateBudgetPayloadType } from '../store/BudgetTypes';
import { convertBudgetDataToFormType } from '../store/helpers';

const { Option } = Select;
const { Item,List } = Form;

const 
CreateBudgetModal = () => {
    const navigate = useNavigate();
    const { budgetId } = useParams();
    const [budgetIdFromState, setBudgetIdState] = useRecoilState(budgetIdState);
    const [budgetPayload, setBudgetPayload] = useRecoilState(CreateBudgetPayloadAtom);
    const categoriesLoadable = useRecoilValueLoadable(fetchCategoriesSelector);
    const budgetDataLoadable = useRecoilValueLoadable(budgetDataSelector);
    const createOrUpdateBudgetLoadable = useRecoilValueLoadable(createOrUpdateBudget);
    const [CreateBudgetForm] = useForm<CreateBudgetFormType>();
    const formValues = useRecoilValue(formState);

    const [valuesToUpdate, setValuesToUpdate] = useState<CreateBudgetFormType | null>(null);
    const [showModal, setShowModal] = useState(false);

    const { loading: categoriesLoading, error: categoriesError, data: categories } = getLoadableStateAndContents(categoriesLoadable);
    useEffect(() => {
        if (budgetId) {
            setBudgetIdState(budgetId);
        }
    }, [budgetId]);

    useEffect(() => {
        if (budgetId) {
            const { state, contents } = budgetDataLoadable;
            console.log("cont:", contents)
            console.log("st:", state)
            if (contents != null && state != 'loading') {

                const mappedValues = convertBudgetDataToFormType(contents.budgets);
                CreateBudgetForm.setFieldsValue(mappedValues);
            }
        }

    }, [budgetDataLoadable, budgetId]);

    useEffect(() => {
        if (createOrUpdateBudgetLoadable.state === 'hasValue' && createOrUpdateBudgetLoadable.contents != undefined) {
            console.log("inside hook:",createOrUpdateBudgetLoadable)
            const response = createOrUpdateBudgetLoadable.contents;
            console.log("response in useeffect::",response)
         
                if (response?.existingId) {
                    setShowModal(true);
                } else {
                    message.success(response?.message);
                    navigate('/budget');
                }
           
        } else if (createOrUpdateBudgetLoadable.state === 'hasError') {
            message.error("An error occurred while processing the request.");
        }
    }, [createOrUpdateBudgetLoadable, setBudgetPayload, setBudgetIdState]);

    const handleYes = (response: DataResponseType) => {
        if (createOrUpdateBudgetLoadable.state === 'hasValue' && createOrUpdateBudgetLoadable.contents != undefined) {
            setBudgetIdState(response.existingId);
        }
        setShowModal(false);
    };


    const handleSubmit = async (values: CreateBudgetFormType) => {
        const updatedBudgets = values.budgets.map(budget => {
            let amountNumber: number = NaN;
            let thresholdNumber: number = NaN;
            console.log("amount first",budget.amount,budget.threshold)
    
            if (budget.amount !== null) {
                amountNumber = parseFloat(budget.amount.toString());
            }
            if (budget.threshold !== null) {
                thresholdNumber = parseFloat(budget.threshold.toString());
            }
    
            return {
                category_name: budget.category_name,
                amount: amountNumber,
                threshold: thresholdNumber,
            };
        });

        const updatedBudgetValues: CreateBudgetPayloadType = {
            budgets: updatedBudgets
        };
        setBudgetPayload(updatedBudgetValues)
    };

    const handleReset = () => {
        CreateBudgetForm.resetFields();
    };


    return (
        <>
            <Form
                layout="vertical"
                name="budgetForm"
                form={CreateBudgetForm}
                onFinish={handleSubmit}
                validateTrigger="onChange"
                initialValues={formValues}
            >
            <List name="budgets">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key}>
                                <Item
                                    {...restField}
                                    label="Category"
                                    name={[name, 'category_name']}
                                    fieldKey={key}
                                    rules={[{ required: true, message: FORM_RULE }]}
                                >
                                    <Select placeholder="Select Category" allowClear>
                                        {categories?.map((category: string, index: number) => (
                                            <Option key={index} value={category}>
                                                {category}
                                            </Option>
                                        ))}
                                    </Select>
                                </Item>

                                <Item
                                    {...restField}
                                    label="Amount"
                                    name={[name, 'amount']}
                                    fieldKey={key}
                                    rules={[{ required: true, message: FORM_RULE }]}
                                >
                                    <Input type="text" placeholder='Enter amount'/>
                                </Item>

                                <Item
                                    {...restField}
                                    label="Threshold"
                                    name={[name, 'threshold']}
                                    fieldKey={key}
                                    rules={[{ required: true, message: FORM_RULE }]}
                                >
                                    <Input type="text" placeholder='Enter threshold'/>
                                </Item>
                                
                                {budgetId ? null : (
                                <Item>
                                    <Space>
                                        <Button className='reset-button' onClick={() => remove(name)}>Remove Budget</Button>
                                    </Space>
                                </Item>
                                )}
                            </div>
                        ))}
                        {budgetId ? null :(
                        <Item>
                            <Button className='generic-button' onClick={() => add()}>Add Budget</Button>
                        </Item>
                        )}
                    </>
                )}
            </List>

            <Row className='button-row'>
                    <Col>
                        <Item wrapperCol={{ offset: 0 }}>
                            <Space>
                            <Button className='reset-button' onClick={handleReset}>Reset</Button>
                                {budgetId ? (
                                    <GenericButton text="Update" />
                                ) : (
                                    <GenericButton text="Create" />
                                )}
                            </Space>
                        </Item>
                    </Col>
                </Row>
            </Form>
            <Modal
                title="Do you want to update it?"
                visible={showModal}
                onOk={() => createOrUpdateBudgetLoadable.state === 'hasValue' && createOrUpdateBudgetLoadable.contents && handleYes(createOrUpdateBudgetLoadable.contents)}
                onCancel={() => setShowModal(false)}
            >
                <p>Are you sure you want to update it?</p>
            </Modal>

        </>
    );
};

export default CreateBudgetModal;
