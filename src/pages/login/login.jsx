import { EmailInput, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import Entry from '../../components/Entry/entry-form';
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/reducer-selector-directory/user/thunk';
import useFormData from '../../custom-hooks/useFormData';
import { loading } from '../../services/reducer-selector-directory/user/user-selector';


function LoginPage() {

    const { data, handleData } = useFormData();
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

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


    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(login(data))
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
                disabled={useSelector(loading)}
                >
                Войти
            </Button>
        </Entry>
    );
}
export default LoginPage;