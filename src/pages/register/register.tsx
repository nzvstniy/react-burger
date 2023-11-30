import { Input, EmailInput, PasswordInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../../components/Entry/entry-form';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/api';
import { register } from '../../services/reducer-selector-directory/user/user-thunk';
import { isLoading } from '../../services/reducer-selector-directory/user/user-selector';
import useFormData from '../../custom-hooks/useFormData';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { IUserRegistration } from '../../services/reducer-selector-directory/user/user-types';


const RegisterPage = () => {
  const { data, handleData } = useFormData();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(register(data as unknown as IUserRegistration));

  };

  const links = (
    <div className={styles.text}>
      <span >Уже зарегистрированы?</span>
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

  return (
    <Entry heading="Регистрация" links={links} onSubmit={onSubmit} >
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        value={data?.name || ''}
        onChange={handleData}
      />
      <EmailInput
        name="email"
        value={data?.email || ''}
        onChange={handleData}
      />
      <PasswordInput
        name="password"
        value={data?.password || ''}
        onChange={handleData}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={useAppSelector(isLoading)}
      >
        Зарегистрироваться
      </Button>
    </Entry>
  );
}

export default RegisterPage;
