import { FiSearch } from "react-icons/fi";
import styles from '../styles/Navbar.module.css'
import SearchIcon from '../public/icons/react-icons/search';
import styled from 'styled-components';
import { useState } from "react";
import { useRouter } from "next/router";
import Responsive from "../config/Responsive";

const SearchBar = () => {
    const router = useRouter();
    const [query, setQuery] = useState<any>("");

    const EnterTrigger = (e: { charCode: any; keyCode: number; }) => {
        if (e.charCode == 13) {
            router.push(`/search?result=${query}`);
        }
    };


    return (
        <div className={styles['search-wrapper']}>
            <div style={{ cursor: "pointer" }} onClick={() => router.push(`/search?result=${query}`)} ><SearchIconStyle /></div>
            <input type="text" placeholder="ძებნა" className={styles.searchInput} onChange={(e) => setQuery(e.target.value)} style={{ textTransform: "lowercase" }} onKeyPress={EnterTrigger} />
        </div>
    )
}

const SearchIconStyle = styled(SearchIcon)`
    height: 24px;
    ${Responsive.laptop} {
        height: 17px;
        width: 15px;
        margin-top: 2px;
        margin-left: 5px;
    }
`;

export default SearchBar;
