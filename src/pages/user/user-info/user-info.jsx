import { Input, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-info.module.css';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../../services/reducer-selector-directory/user/thunk';
import { getEmail, getName } from '../../../services/reducer-selector-directory/user/user-selector';
import UserButton from '../user-button/user-button';
import useFormData from '../../../custom-hooks/useFormData';

function UserInfo() {

    const { data, setData, handleData } = useFormData();

    const dispatch = useDispatch();
    const name = useSelector(getName);
    const email = useSelector(getEmail);

    const [buttonVisivility, setButtonVisibility] = useState(false);

    useEffect(() => {
        setButtonVisibility(
            data.name !== name || data.email !== email || data.password
        );
    }, [data, name, email])

    const undoChanges = useCallback(() => {
        setData({ name: name, email: email, password: '' });
    }, [name, email])

    useEffect(() => {
        if (name && email) {
            setData({ ...data, name: name, email: email });
        }
    }, [name, email]
    );

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(editUser(data));
    }

    return (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
            <Input
                placeholder="Имя"
                icon="EditIcon"
                name='name'
                value={data?.name || ''}
                onChange={handleData}
            />
            <Input
                placeholder="Логин"
                icon="EditIcon"
                name='email'
                value={data?.email || ''}
                onChange={handleData}
            />
            <PasswordInput
                icon="EditIcon"
                name={'password'}
                value={data?.password || ''}
                onChange={handleData}
            />
            {buttonVisivility && <UserButton undo={undoChanges} />}
        </form>
    )
}

export default UserInfo;