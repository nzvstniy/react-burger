import { Input, EmailInput, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../../components/Entry/entry-form';
import styles from './reset-password.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/api';
import { passwordReset } from '../../utils/password';
import useFormData from '../../custom-hooks/useFormData';

function ResetPasswordPage() {

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


    const onSubmit = (event) => {
        event.preventDefault();
        passwordReset(data)
            .then((res) => {
                if (res.success) {
                    navigate(ROUTES.sign.in);
                    localStorage.removeItem('passwordForgot');
                }
            })
            .catch((error) => console.error(`Ошибка: ${error}`));
    }

    return (
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