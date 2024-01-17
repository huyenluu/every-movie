import styles from './NavBar.module.css';
import { BiMoviePlay } from "react-icons/bi";
import { RiHeartLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className={styles.navBar}>
            <Link to="/">
                <div className={styles.logo}>
                    <BiMoviePlay className={styles.logoIcon} />
                    <h1>Every Movie</h1>
                </div>
            </Link>
            <input className={styles.searchBar} type="text" placeholder="Search..." />
            <Link to="/favorites">
                <RiHeartLine className={styles['heart-icon']} />
            </Link>
        </div>
    );
};

export default NavBar;
