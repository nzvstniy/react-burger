import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../../components/Entry/entry-form';
import styles from './forgot-password.module.css';
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/api';
import { passwordForgot } from '../../utils/password';
import useFormData from '../../custom-hooks/useFormData';


const ForgotPasswordPage = () => {
    const { data, handleData } = useFormData();

    const navigate = useNavigate();

    const links = (
        <div className={styles.text}>
            <span>Вспомнили пароль?</span>
            <Button
                extraClass={styles.link}
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={() => navigate(ROUTES.sign.in)}
            >
                Войти
            </Button>
        </div>
    );

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        passwordForgot(data as unknown as { email:string })
            .then((res) => {
                if (res.success) {
                    localStorage.setItem('passwordForgot', JSON.stringify(true));
                    navigate(ROUTES.password.reset)
                }
            })
            .catch((error) => console.error(`Ошибка: ${error}`))
    }

    return (
        <Entry heading="Восстановление пароля" links={links} onSubmit={onSubmit}>
            <EmailInput
                placeholder="Укажите e-mail"
                name='email'
                value={data?.email || ''}
                onChange={handleData}
            />
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
            >
                Восстановить
            </Button>
        </Entry>
    );

}

export default ForgotPasswordPage;