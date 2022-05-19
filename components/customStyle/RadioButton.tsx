import React from 'react'
import styled from 'styled-components';


const RadioButton: React.FC<{
    id: string;
    options: { value: any; label: any; disabled?: boolean }[];
    value: any;
    required?: boolean;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
}> = ({
    id,
    options,
    value,
    onChange,
    required = false,
    style
}) => {
        return (
            <Wrapper style={style}>
                {options.map((o) => (
                    <Content key={o.value}>
                        <Input
                            value={o.value}
                            id={`${id}-${o.value}`}
                            type="radio"
                            checked={o.value === value}
                            required={required}
                            onChange={() => onChange(o.value)}
                            disabled={o.disabled || false}
                        />
                        <Label htmlFor={`${id}-${o.value}`}>{o.label}</Label>
                    </Content>
                ))}
            </Wrapper>
        )
    }

// style
const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: fit-content;
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 17px;
        &:last-child {
            margin-bottom: 0px;
        }
        &:hover {
            opacity: 0.8;
        }
`;
const Label = styled.label`
    font-size: 18px;
    color: #424F60;
    user-select: none;
    padding-left: 14px;
    font-family: 'helvetica';
    font-weight: 500;
`;
const Input = styled.input.attrs({ type: "radio" })`
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

export default RadioButton;