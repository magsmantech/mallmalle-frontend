import { useState, useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from 'styled-components';
import EarthLogo from '../public/icons/planet-earth.svg';


const EarthLogoStyle = styled(EarthLogo)`
    height: 25px;
    width: 20px;
    margin-right: 5px;
`;

type Props = {
    languages: string[],
};

const LanguageSwitcher = ({languages}: Props) => {
    const test = languages[0];
    const [selected, setSelected] = useState(test);
    const [items, setItems] = useState(languages);
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        const arr = languages.filter((lang) => lang !== selected);
        setItems(arr);
    }, [selected]);

    const mouseEnter = () => {
        if (!showItems) {
            setShowItems(true);
        }
    };
    const mouseLeave = () => {
        if (showItems) {
            setShowItems(false);
        }
    };
    
    return(
        <div onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            style={{marginLeft: '0.5rem', width: '6.0rem'}}>
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '1.2rem', fontFamily: 'noto-sans'}}>
                <EarthLogoStyle/>
                {selected}
                <AiOutlineDown size={'1.4rem'} style={{marginLeft: '.4rem'}}/>
                {showItems && <ul style={{position: 'absolute', top: '100%', marginLeft: '1.4rem'}}>
                    {items.map((item, i)=>
                    <li key={i} style={{cursor: 'pointer'}}
                        onClick={()=>setSelected(item)}>{item}</li>
                    )}
                </ul>}
            </div>
        </div>
    )
};

export default LanguageSwitcher;

