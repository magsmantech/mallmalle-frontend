import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import { ChipWrapper, ChipTitle, ChipIconWrapper } from "./styled/Chips";
import { Wrapper, Item as RadioItem, RadioButtonLabel, RadioButton } from "./styled/radioButton";

const SelectContainer = styled.div`
    position: absolute;
    top: calc(100% + 1.0rem);
    left: 50%;
    z-index: 4;
    background-color: white;
    border-radius: 1.4rem;
    padding: 1.0rem;
    width: 20.8rem;
    transform: translateX(-50%);
    box-shadow: 0 0 .4rem .4rem rgba(0, 0, 0, 0.08);
`;

type Props = any;

const FilterSelect = ({ style }: Props) => {
    const [select, setSelect] = useState("popular");
    const [show, setShow] = useState(false)

    const handleSelectChange = (event: any) => {
        const value = event.target.value;
        setSelect(value);
    };

    const radios = [
        {
            value: 'popular',
            label: 'პოპულარობა'

        },
        {
            value: 'rating',
            label: 'რეიტინგი'
        },
        {
            value: 'new',
            label: 'ახალი'
        },
        {
            value: 'sale',
            label: 'ფასდაკლება'
        },
        {
            value: 'min',
            label: 'მინ. ფასი'
        },
        {
            value: 'max',
            label: 'მაქს. ფასი'
        },
    ]

    const _onClick = () => {
        setShow(!show);
    }


    return <>
        <div style={{ position: 'relative', ...style }}>
            <ChipWrapper onClick={() => _onClick()}
                hoverColor="rgba(34, 213, 174, .5)"
                color={'rgba(34, 213, 174, .25)'}>
                <ChipTitle>პოპულარობა</ChipTitle>
                <ChipIconWrapper>
                    <BsChevronDown size={'2.0rem'}></BsChevronDown>
                </ChipIconWrapper>
            </ChipWrapper>

            {show && <SelectContainer>
                <Wrapper>
                    {radios.map((item, index) =>
                        <RadioItem key={index}>
                            <RadioButton
                                type="radio"
                                name="radio"
                                value={item.value}
                                checked={select === item.value}
                                onChange={(event) => handleSelectChange(event)}
                            />
                            <RadioButtonLabel />
                            <div>{item.label}</div>
                        </RadioItem>
                    )}
                </Wrapper>
            </SelectContainer>}
        </div>
    </>
}

export default FilterSelect;
