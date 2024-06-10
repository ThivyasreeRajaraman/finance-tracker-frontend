import React from 'react';
import './style.css';
import { Button, Row, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    buttonText?: string;
    needBackButton: boolean;
    needDivider: boolean;
    onButtonClick?: () => void;
}

const Header = ({ needBackButton, title, buttonText, needDivider, onButtonClick }: HeaderProps) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Row className="header">
                {needBackButton && (
                    <Button type="link" icon={<ArrowLeftOutlined />} className="back-button" onClick={handleBackButtonClick} />
                )}

                <h1 className="title">{title}</h1>

                {buttonText && (
                    <button onClick={onButtonClick} className="custom-button">{buttonText}</button>
                )}
            </Row>
            {needDivider && (
                <Divider className="custom-divider" />
            )}

        </>

    );
};

export default Header;