import AppHeader from '../AppHeader/app-header';
import styles from './entry-form.module.css';
import { FC, FormEvent, ReactNode } from 'react';

interface IEntryProps {
    children: ReactNode;
    heading: string;
    links: ReactNode;
    onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}

const Entry: FC<IEntryProps> = ({ children, heading, links, onSubmit }) => (
    <>
        <AppHeader />
        <main>
            <div className={styles.wrapper}>
                <form className={styles.form} noValidate onSubmit={onSubmit}>
                    <h1 className={`${styles.heading} text_type_main-medium text_color_active`}>{heading}</h1>
                    {children}
                </form>
                <div className={`${styles.links} text_type_main-default text_color_inactive`}>{links}</div>
            </div>
        </main>
    </>
)


export default Entry;