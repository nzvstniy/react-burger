import { Input, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-info.module.css';
import { useEffect, useState, useCallback, FormEvent } from 'react';
import { editUser } from '../../../services/reducer-selector-directory/user/user-thunk';
import { getEmail, getName } from '../../../services/reducer-selector-directory/user/user-selector';
import UserButton from '../user-button/user-button';
import useFormData from '../../../custom-hooks/useFormData';
import { useStoreDispatch, useStoreSelector } from '../../../services/hooks';
import { IUserEdit } from '../../../services/reducer-selector-directory/user/user-types';

const UserInfo = () => {

    const { data, setData, handleData } = useFormData();

    const dispatch = useStoreDispatch();
    const name = useStoreSelector(getName);
    const email = useStoreSelector(getEmail);

    const [buttonVisivility, setButtonVisibility] = useState(false);

    useEffect(() => {
        setButtonVisibility(
            data?.name !== name || data?.email !== email || !!data?.password
        );
    }, [data, name, email])

    const undoChanges = useCallback(() => {
        if (name && email) {
            setData({ name: name, email: email, password: '' });
        }
    }, [name, email])

    useEffect(() => {
        if (name && email) {
            setData({ ...data, name: name, email: email });
        }
    }, [name, email]
    );


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(editUser(data as unknown as IUserEdit));
    };
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