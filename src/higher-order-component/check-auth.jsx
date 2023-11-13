import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { checkAuthStatus } from '../services/reducer-selector-directory/user/user-selector';
import Preload from '../components/Preload/preload';

function CheckAuth({ component }) {
    const isAuthChecked = useSelector(checkAuthStatus);
    return isAuthChecked ? component : <Preload/>;
}

CheckAuth.propTypes = {
    component: PropTypes.node.isRequired,
}

export default CheckAuth;