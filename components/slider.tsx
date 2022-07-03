import ReactSlider from "react-slider";
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Fonts from './../styles/Fonts';
import Responsive from "../config/Responsive";

type Props =any;
const Slider = ({onChange}: Props) => {
    const sliderRef = useRef<any>(null);
    const [position1, setPosition1] = useState(0);
    const [position2, setPosition2] = useState(0);
    const [value, setValue] = useState([0, 10]);
    const [amount1, setAmount1] = useState(0);

    const [amount2, setAmount2] = useState(1000);

    const _onValueChange = (e: number[]) => {
        setValue(e);
        // console.log(e);
        if(!sliderRef?.current) return;

        const current = sliderRef?.current;

        const length = current?.state?.sliderLength;
        const newPos1 = length * e[0] / 11;
        setPosition1(newPos1);    
        setAmount1(e[0]* 100);
        const newPos2 = length * e[1] / 11;
        setPosition2(newPos2);    
        setAmount2(e[1]* 100);

        if (onChange) {
            onChange({
                startIndex: e[0],
                startValue: e[0]* 100,
                
                endIndex: e[1],
                endValue: e[1]* 100,
            })
        }

    }

    const _setDefaultPosition2 = () => {
        setTimeout(() => {
            // console.log(sliderRef)
      
            const current = sliderRef?.current;
      
            const length = current?.state?.sliderLength;
      
            // console.log(length);
            
            const newPos2 = length * 10 / 11;
            setPosition2(newPos2);    
            setAmount2(10* 100);
    
        }, 0);
    }

    useEffect(() => {
      _setDefaultPosition2();
    }, [])
    

    return (
        <>
            <ReactSliderStyle className="slider-wrapper">
                <ReactSlider
                    value={value}
                    ref={sliderRef}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(e) => _onValueChange(e)}
                    min={0}
                    max={10}
                    marks
                />
                <SliderLabel className="slider-label"
                    style={{
                        transform: `translateX(${position1}px)`
                    }}
                >{amount1} ₾</SliderLabel>
                <SliderLabel className="slider-label"
                    style={{
                        transform: `translateX(${position2}px)`
                    }}
                >{amount2} ₾</SliderLabel>

            </ReactSliderStyle>
        </>
    );
};

const ReactSliderStyle = styled.div`
 
    .example-thumb {
        width: 30px;
        height: 30px;
        border-width: 4px;
    }
    .horizontal-slider .example-track {
        height: 2px;
        top: 26px;
    }
    .mark {
        display: none;
    }
`;

const SliderLabel = styled.div`
    font-size: 18px;
    font-family: ${Fonts.FiraGOMedium};
    top: -1rem;
        ${Responsive.mobile}{
            &:last-child {
                margin-left: -34px;
            }
        }
`;

export default Slider;