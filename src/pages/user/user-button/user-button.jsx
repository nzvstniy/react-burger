import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-button.module.css';
import { useSelector } from 'react-redux';
import { loading } from '../../../services/reducer-selector-directory/user/user-selector';


function UserButton({ undo }) {
    return (
        <div className={styles.buttons}>
            <Button
                htmlType="button"
                type="secondary"
                extraClass={styles.undo}
                onClick={undo}
            >
                Отмена
            </Button>
            <Button
                htmlType="submit"
                type="primary"
                disabled={useSelector(loading)}
            >
                Сохранить
            </Button>
        </div>
    )
}

UserButton.propTypes = {
    undo: PropTypes.func.isRequired,
}

export default memo(UserButton);