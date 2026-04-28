import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectUserLoading, 
  selectUserError,
  selectUserName,
  selectUserEmail,
  selectUserRole,
  selectUserId,
  selectIsAdmin,
  selectUserProfile
} from './userSelectors';
import { setUser, clearUser, setLoading, setError, clearError } from './userSlice';

// Custom hook for user state and actions
export const useUser = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userRole = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  const isAdmin = useSelector(selectIsAdmin);
  const userProfile = useSelector(selectUserProfile);
  
  // Actions
  const login = (userData) => dispatch(setUser(userData));
  const logout = () => dispatch(clearUser());
  const setUserLoading = (value) => dispatch(setLoading(value));
  const setUserError = (error) => dispatch(setError(error));
  const clearUserError = () => dispatch(clearError());
  
  return {
    // State
    currentUser,
    isAuthenticated,
    loading,
    error,
    userName,
    userEmail,
    userRole,
    userId,
    isAdmin,
    userProfile,
    // Actions
    login,
    logout,
    setUserLoading,
    setUserError,
    clearUserError,
  };
};

export default useUser;