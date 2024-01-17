import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';
function ErrorMessage({ message }) {
    return (
        <div className={styles.error}>
            <span>⛔️</span> {message}
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;
