import ReactSlider from "react-slider";
import { useEffect, useRef, useState } from "react";


type Props =any;
const Slider = ({onChange}: Props) => {
    const sliderRef = useRef<any>(null);
    const [position1, setPosition1] = useState(0);
    const [position2, setPosition2] = useState(0);
    const [value, setValue] = useState([0, 10]);
    const [amount1, setAmount1] = useState(0);

    const [amount2, setAmount2] = useState(500);

    const _onValueChange = (e: number[]) => {
        setValue(e);
        console.log(e);
        if(!sliderRef?.current) return;

        const current = sliderRef?.current;

        const length = current?.state?.sliderLength;
        const newPos1 = length * e[0] / 11;
        setPosition1(newPos1);    
        setAmount1(e[0]* 50);
        const newPos2 = length * e[1] / 11;
        setPosition2(newPos2);    
        setAmount2(e[1]* 50);

        if (onChange) {
            onChange({
                startIndex: e[0],
                startValue: e[0]* 50,
                
                endIndex: e[1],
                endValue: e[1]* 50,
            })
        }

    }

    const _setDefaultPosition2 = () => {
        setTimeout(() => {
            console.log(sliderRef)
      
            const current = sliderRef?.current;
      
            const length = current?.state?.sliderLength;
      
            console.log(length);
            
            const newPos2 = length * 10 / 11;
            setPosition2(newPos2);    
            setAmount2(10* 50);
    
        }, 0);
    }

    useEffect(() => {
      _setDefaultPosition2();
    }, [])
    

    return (
        <>
            <div className="slider-wrapper">
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
                <div className="slider-label"
                    style={{
                        transform: `translateX(${position1}px)`
                    }}
                >{amount1} $</div>
                <div className="slider-label"
                    style={{
                        transform: `translateX(${position2}px)`
                    }}
                >{amount2} $</div>

            </div>
        </>
    );
};
export default Slider;