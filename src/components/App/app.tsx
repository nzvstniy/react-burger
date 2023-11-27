import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/api';
import HomePage from '../../pages/home/home';
import RegisterPage from '../../pages/register/register';
import LoginPage from '../../pages/login/login';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/user/profile/profile';
import { useEffect } from 'react';
import UserInfo from '../../pages/user/user-info/user-info';
import Page404 from '../../pages/page-404/page-404';
import { NotAuth, Auth } from '../../higher-order-component/protected-route';
import FeedPage from '../../pages/feed/feed';
import { checkUserAuth } from '../../services/reducer-selector-directory/user/user-thunk';
import CheckAuth from '../../higher-order-component/check-auth';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';
import Modal from '../Modal/modal';
import IngredientDetails from '../IngredientDetails/ingredient-details';
import { useGetIngredientsQuery } from '../../services/reducer-selector-directory/ingredients/ingredients-reducer';
import { RESET_INGREDIENT_DETAILS } from '../../services/reducer-selector-directory/currentIngredient/current-ingredient-slice';
import ProfileOrdersPage from '../../pages/user/profile-orders/profile-orders';
import { useStoreDispatch } from '../../services/hooks';
import AppHeader from '../AppHeader/app-header';

function App() {
  const dispatch = useStoreDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const background = location.state?.background;

  const handleModalClose = () => {

    navigate(-1);
    dispatch(RESET_INGREDIENT_DETAILS());
  };

  useGetIngredientsQuery();


  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route
          path={ROUTES.ingredientDetails}
          element={<CheckAuth component={<IngredientDetailsPage />} />}
        />
        <Route
          path={ROUTES.orders}
          element={<CheckAuth component={<FeedPage />} />}
        />
        <Route
          path={ROUTES.user.profile}
          element={<Auth component={<ProfilePage />} />}
        >
          <Route index element={<UserInfo />} />
          <Route path={ROUTES.user.orders} element={<ProfileOrdersPage />} />
        </Route>
        <Route
          path={ROUTES.sign.up}
          element={<NotAuth component={<RegisterPage />} />}
        />
        <Route
          path={ROUTES.sign.in}
          element={<NotAuth component={<LoginPage />} />}
        />
        <Route
          path={ROUTES.password.forgot}
          element={<NotAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={ROUTES.password.reset}
          element={<NotAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="*"
          element={<CheckAuth component={<Page404 />} />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={ROUTES.ingredientDetails}
            element={
              <CheckAuth
                component={
                  <Modal
                    id="ingredient-details"
                    modalClose={handleModalClose}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  )
}


export default App;