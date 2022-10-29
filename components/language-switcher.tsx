import { useState, useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

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
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '1.8rem', fontFamily: 'noto-sans'}}>
                {selected}
                <AiOutlineDown size={'1.4rem'} style={{marginLeft: '.4rem'}}/>
                {showItems && <ul style={{position: 'absolute', top: '100%', marginLeft: '-1.5rem', marginTop: '-10px'}}>
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

