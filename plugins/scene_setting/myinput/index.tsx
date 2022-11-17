import { Tree, Popover, Row, Col, InputNumber, Divider, Card, Select, Switch, Collapse } from 'antd';
import React, { Component } from 'react';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type OmitAttrs = 'defaultValue' | 'onChange' | 'size';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
    prefixCls?: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number | string;
    defaultValue?: number;
    tabIndex?: number;
    onChange?: (value: number | undefined) => void;
    disabled?: boolean;
    size?: 'large' | 'small' | 'default';
    formatter?: (value: number | string | undefined) => string;
    parser?: (displayValue: string | undefined) => number;
    decimalSeparator?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    name?: string;
    id?: string;
    precision?: number;
}

export function MyInput(props: InputNumberProps) {
    return <InputNumber {...props} step={0.1} onBlur={(e) => {
        console.log(e);
        props.onBlur!(e.target.value as any);
    }} style={{ width: 80 }} size="small" />;
}