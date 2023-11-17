import { Input, EmailInput, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../../components/Entry/entry-form';
import styles from './reset-password.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/api';
import { passwordReset } from '../../utils/password';
import useFormData from '../../custom-hooks/useFormData';

const ResetPasswordPage = () => {

    const { data, handleData } = useFormData();

    const navigate = useNavigate();

    let isPasswordForgot: string | null | boolean = localStorage.getItem('passwordForgot');

    if (isPasswordForgot) {
        isPasswordForgot = JSON.parse(isPasswordForgot) as boolean;
    }

    if (!isPasswordForgot) return <Navigate to={ROUTES.sign.in} />;

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
        passwordReset(data as unknown as { password: string; token: string })
            .then((res) => {
                if (res.success) {
                    navigate(ROUTES.sign.in);
                    localStorage.removeItem('passwordForgot');
                }
            })
            .catch((error) => console.error(`Ошибка: ${error}`));
    }

    return !isPasswordForgot ? null : (
        <Entry heading="Восстановление пароля" links={links} onSubmit={onSubmit}>
            <PasswordInput
                placeholder="Введите новый пароль"
                name='password'
                value={data?.password || ''}
                onChange={handleData}
            />
            <Input
                placeholder="Введите код из письма"
                type='text'
                name='token'
                value={data?.token || ''}
                onChange={handleData}
            />
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
            >
                Сохранить
            </Button>
        </Entry>
    );

}

export default ResetPasswordPage;