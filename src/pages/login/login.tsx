import { EmailInput, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import Entry from '../../components/Entry/entry-form';
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/api';
import { login } from '../../services/reducer-selector-directory/user/user-thunk';
import useFormData from '../../custom-hooks/useFormData';
import { isLoading } from '../../services/reducer-selector-directory/user/user-selector';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { IUserLogin } from '../../services/reducer-selector-directory/user/user-types';


const LoginPage = () => {
    const { data, handleData } = useFormData();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const links = (
        <>
            <div className={styles.text}>
                <span >Вы - новый пользователь?</span>
                <Button
                    extraClass={styles.link}
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={() => navigate(ROUTES.sign.up)}
                >
                    Зарегистрироваться
                </Button>
            </div>

            <div className={styles.text}>
                <span >Забыли пароль?</span>
                <Button
                    extraClass={styles.link}
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={() => navigate(ROUTES.password.forgot)}
                >
                    Восстановить пароль
                </Button>
            </div>
        </>
    );


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login(data as unknown as IUserLogin))
            .then(() => navigate(location.state?.from?.pathname || ROUTES.home))
            .catch((error) => console.error(`Ошибка: ${error}`));
    };

    return (
        <Entry heading="Вход" links={links} onSubmit={onSubmit}>
            <EmailInput
                name='email'
                value={data?.email || ''}
                onChange={handleData}
            />
            <PasswordInput
                name='password'
                value={data?.password || ''}
                onChange={handleData}
            />
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                disabled={useAppSelector(isLoading)}
                >
                Войти
            </Button>
        </Entry>
    );
}
export default LoginPage;