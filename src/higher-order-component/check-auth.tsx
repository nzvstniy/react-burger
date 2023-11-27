import { checkAuthStatus } from '../services/reducer-selector-directory/user/user-selector';
import Preload from '../components/Preload/preload';
import { useStoreSelector } from '../services/hooks';

const CheckAuth = ({ component }: { component: React.ReactElement }) => {
    const isAuthChecked = useStoreSelector(checkAuthStatus);
    return isAuthChecked ? component : <Preload/>;
}

export default CheckAuth;