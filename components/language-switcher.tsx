import { useState, useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from 'styled-components';
import Responsive from '../config/Responsive';
import UsFlag from '../public/icons/react-icons/usFlag';
import GeoFlag from '../public/icons/react-icons/geoFlag';



const UsFlagStyle = styled(UsFlag)`
    ${Responsive.laptop} {
        margin-left: -10px;
    }
`;
const GeoFlagStyle = styled(GeoFlag)`
    ${Responsive.laptop} {
        margin-left: -10px;
    }
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

    const showFlags = () => {
        setShowItems(!showItems);
    };
    const mouseLeave = () => {
        if (showItems) {
            setShowItems(false);
        }
    };
    
    return(
        <div 
            // onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            style={{marginLeft: '0.5rem', width: '6.0rem'}}>
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '1.1rem', fontFamily: 'noto-sans'}}>
                {selected == "EN" &&
                <UsFlagStyle/>
                }
                {selected == "GEO" &&
                <GeoFlagStyle />
                }
                {/* {selected} */}
                <AiOutlineDown
                    size={'1.4rem'}
                    style={{marginLeft: '.4rem', cursor: "pointer"}} 
                    onClick={showFlags}
            />
                {showItems && <ul style={{position: 'absolute', top: '100%', marginTop: '-0.7rem'}}>
                    {items.map((item, i)=>
                    <li key={i} style={{cursor: 'pointer'}}
                        onClick={()=>setSelected(item)}>
                            {selected == "EN" &&
                            <GeoFlagStyle />
                            }
                            {selected == "GEO" &&
                            <UsFlagStyle/>
                            }
                        </li>
                    )}
                </ul>}
            </div>
        </div>
    )
};

export default LanguageSwitcher;

