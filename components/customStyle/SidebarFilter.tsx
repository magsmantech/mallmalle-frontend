import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../../config/Responsive';
import { Scrollbar } from '../GlobalStyle';
import RadioButton from './RadioButton';
import MuiSlider from './MuiSlider';
import Button from '../styled/button';


const SidebarFilter: React.FC<{}> = ({ }) => {

    const [closeSideBar, setCloseSideBar] = useState(false); //close side bar
    const [selected, setSelected] = useState(); //radio button selected value
    const [selectedSale, setSelectedSale] = useState(); //radio button selected value


    return closeSideBar === true ? null : (
        <Wrapper>
            <Shadow onClick={() => setCloseSideBar(!closeSideBar)} />
            <Scrollbar hide={true} />
            <Content>
                <InnerContent>
                    <MediumTitle>კატეგორიები</MediumTitle>
                    <RadioBox>
                        <RadioButton
                            id="userType"
                            onChange={(value) => setSelected(value)}
                            options={[
                                { label: "i am levan", value: "levan" },
                                { label: "i am giorgi", value: "giorgi" },
                            ]}
                            value={selected}
                        />
                    </RadioBox>
                    <MediumTitle>ფასი</MediumTitle>
                    <MuiSlider />
                    <RadioButton
                        id="userType"
                        onChange={(value) => setSelectedSale(value)}
                        options={[
                            { label: "ფასდაკლება", value: "sale" },
                        ]}
                        value={selectedSale}
                    />
                </InnerContent>
                <BottomContent>
                    <BtnWithBorder>გასუფთავება</BtnWithBorder>
                    <FillBtn>აჩვენე 124</FillBtn>
                </BottomContent>
            </Content>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    
`;
const Shadow = styled.div`
    position: fixed;
    top: 125px;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 20;
    height: 100%;
    width: 100%;
`;
const Content = styled.div`
    position: fixed;
    right: 0;
    top: 125px;
    background-color: #fff;
    z-index: 22;
    height: calc(100% - 125px);
    width: 490px;
    padding: 50px 30px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
        ${Responsive.mobile}{
            width: 100%;
            height: 75%;
            bottom: 0;
            left: 0;
            top: unset;
            right: unset;
            border-radius: 20px 20px 0px 0px;
        }
`;
const InnerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const BottomContent = styled.div`
    background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0px;
`;
const MediumTitle = styled.h4`
    font-size: 18px;
    color: #424F60;
    font-family: 'BPG WEB 002 CAPS';
    font-weight: 400;
`;
const RadioBox = styled.div`
    margin-top: 30px;
    padding-bottom: 45px;
    margin-bottom: 45px;
    border-bottom: 1px solid #DEDEDE;
`;
const BtnWithBorder = styled.button` //TODO Levan Madurashvili
    height: 70px;
    border: 3px solid #22D5AE;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0px 30px;
    font-size: 20px;
    font-family: 'helvetica';
    color: #22D5AE;
    cursor: pointer;
`;
const FillBtn = styled.button` //TODO Levan Madurashvili
    height: 70px;
    border: 3px solid #22D5AE;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0px 30px;
    font-size: 20px;
    font-family: 'helvetica';
    color: #22D5AE;
    cursor: pointer;
`;


export default SidebarFilter