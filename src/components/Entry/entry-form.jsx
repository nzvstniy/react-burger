import PropTypes from 'prop-types';
import AppHeader from '../AppHeader/app-header';
import styles from './entry-form.module.css';

function Entry({ children, heading, links, onSubmit }) {

    return (
        <>
            <AppHeader />
            <main>
                <div className={styles.wrapper}>
                    <form className={styles.form} noValidate onSubmit={onSubmit}>
                        <h1 className={`${styles.heading} text_type_main-medium text_color_active`}>{heading}</h1>
                        {children}
                    </form>
                    <div className={`${styles.links} text_type_main-default text_color_inactive`}>{links}</div>
                </div>
            </main>
        </>
    )

}

Entry.propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    links: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Entry;