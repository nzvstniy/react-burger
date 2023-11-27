import { FC, memo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-button.module.css';
import { isLoading } from '../../../services/reducer-selector-directory/user/user-selector';
import { useStoreSelector } from '../../../services/hooks';

interface IUserButtonProps {
    undo: () => void;
}

const UserButton: FC<IUserButtonProps> = ({ undo }) => (
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
            disabled={useStoreSelector(isLoading)}
        >
            Сохранить
        </Button>
    </div>
)


export default memo(UserButton);