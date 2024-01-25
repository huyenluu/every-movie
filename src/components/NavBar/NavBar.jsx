
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiMoviePlay } from "react-icons/bi";
import { RiHeartLine } from "react-icons/ri";
import styles from './NavBar.module.css';

const NavBar = ({children}) => {
    return (
        <div className={styles.navBar}>
            <Link to="/">
                <div className={styles.logo}>
                    <BiMoviePlay className={styles.logoIcon} />
                    <h1>Every Movie</h1>
                </div>
            </Link>
            {children}
            <Link to="/favorites">
                <RiHeartLine className={styles['heart-icon']} />
            </Link>
        </div>
    );
};

export default NavBar;

NavBar.propTypes = {
    children: propTypes.element
}
