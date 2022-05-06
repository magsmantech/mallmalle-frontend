import {FiSearch} from "react-icons/fi";
import styles from '../styles/Navbar.module.css'
import SearchIcon from '../public/icons/react-icons/search';

const SearchBar = () => {

    return (
            <div className={styles['search-wrapper']}>
                <a href={"/search"}><SearchIcon width={'2.8rem'} height={'2.8rem'} /></a>
                <input type="text" placeholder="ძებნა" className={styles.searchInput} />
            </div>
    )
}

export default SearchBar;
