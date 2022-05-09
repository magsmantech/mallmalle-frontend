import {FiSearch} from "react-icons/fi";
import styles from '../styles/Navbar.module.css'
import SearchIcon from '../public/icons/react-icons/search';
import styled from 'styled-components';

const SearchBar = () => {

    return (
            <div className={styles['search-wrapper']}>
                <a href={"/search"}><SearchIconStyle /></a>
                <input type="text" placeholder="ძებნა" className={styles.searchInput} />
            </div>
    )
}

const SearchIconStyle = styled(SearchIcon)`
    height: 24px;
    margin-top: 2px;
`;

export default SearchBar;
