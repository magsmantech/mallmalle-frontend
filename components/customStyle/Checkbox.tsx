import styled from 'styled-components';
import Link from "next/link";
import { useState } from 'react';

const Checkbox: React.FC<{
    id: string;
    name?: string;
    label: string;
    route?: string;
    linkText?: string;
    onChange?: (_: boolean) => void;
}> = ({
    id,
    name,
    label,
    route,
    linkText,
    onChange = undefined,
}) => {

        return (
            <Wrapper>
                <Input type="checkbox" name={name} id={id} onChange={(event) => onChange(event.target.checked)} />
                <Label htmlFor={id}>{label}{route && linkText ? <CheckboxLink href={route}>{linkText}</CheckboxLink> : null}</Label>
            </Wrapper>
        )
    }

// style
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
        &:hover {
            opacity: 0.8;
        }
`;
const CheckboxLink = styled(Link)`

`;
const Label = styled.label`
    font-size: 18px;
    color: #424F60;
    user-select: none;
    padding-left: 14px;
    font-family: 'helvetica';
    font-weight: 500;
`;
const Input = styled.input.attrs({ type: "checkbox" })`
    -webkit-appearance: none;
    appearance: none;
    
        &::before {
            content: '';
            height: 24px;
            width: 24px;
            border-radius: 50%;
            display: block;
            background-color: #EDEDED;
        }
        &:checked {
            &::before {
                border: 6px solid #22D5AE;
                height: 24px;
                width: 24px;
                background-color: #ffffff;
            }
        }
`;

export default Checkbox;