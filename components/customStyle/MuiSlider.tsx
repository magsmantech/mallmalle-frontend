import React from 'react'
import { Slider } from '@mui/material'
import styled from 'styled-components';


const MuiSlider: React.FC<{}> = ({ }) => {//TODO finish slider for Levan Madurashvili

    return (
        <Wrapper>
            <Slider
                size="small"
                defaultValue={70}
                aria-label="Small"
                valueLabelDisplay="on"
                sx={{
                    width: "100%",
                    color: '#22D5AE',
                    '& .MuiSlider-thumb': {
                        borderRadius: '50%',
                    },
                    '& .MuiSlider-valueLabelOpen': {
                        backgroundColor: "transparent",
                        color: '#22D5AE',
                        fontSize: "18px",
                        fontFamily: "fira-go",
                        fontWeight: 400,
                        marginTop: "8px",
                    },
                }}
            />
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 40px;
`;

export default MuiSlider