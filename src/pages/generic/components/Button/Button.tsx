import React from 'react';
import { Button } from 'antd';
import './style.css'

interface GenericButtonProps {
    text: string;
}

const GenericButton = ({ text }:GenericButtonProps) => {
   
    return (
        <Button type="primary" htmlType="submit" className={`${text === 'Reset' ? 'reset-button' : 'generic-button'}`}>
            {text}
        </Button>
    );
};

export default GenericButton;