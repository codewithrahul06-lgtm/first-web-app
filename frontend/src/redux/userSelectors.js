import { createSelector } from '@reduxjs/toolkit';
import store from './store';

// Base selectors - these extract raw data from the state
const selectUserState = (state) => state.user;
const selectCurrentUser = (state) => state.user.currentUser;
const selectIsAuthenticated = (state) => state.user.isAuthenticated;
const selectUserLoading = (state) => state.user.loading;
const selectUserError = (state) => state.user.error;

// Export base selectors
export { selectUserState, selectCurrentUser, selectIsAuthenticated, selectUserLoading, selectUserError };

// Memoized selectors using createSelector for optimized re-renders
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState
);

export const selectUserProfile = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser
);

export const selectUserName = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.name || null
);

export const selectUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.email || null
);

export const selectUserRole = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.role || null
);

export const selectUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?._id || currentUser?.id || null
);

export const selectIsAdmin = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.role === 'admin' || false
);

export const selectIsUserLoading = createSelector(
  [selectUserLoading],
  (loading) => loading
);

export const selectUserErrorMessage = createSelector(
  [selectUserError],
  (error) => error
);

// Helper function to get user from store
export const getUser = () => {
  const state = store.getState();
  return selectCurrentUser(state);
};

export const isAuthenticated = () => {
  const state = store.getState();
  return selectIsAuthenticated(state);
};

export const isAdmin = () => {
  const state = store.getState();
  return selectIsAdmin(state);
};

// Export all selectors as a single object for convenience
export const userSelectors = {
  selectUserState,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
  selectUser,
  selectUserProfile,
  selectUserName,
  selectUserEmail,
  selectUserRole,
  selectUserId,
  selectIsAdmin,
  selectIsUserLoading,
  selectUserErrorMessage,
};

export default userSelectors;