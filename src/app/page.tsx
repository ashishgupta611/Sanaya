'use client';

import { useAppSelector, RootState } from '../store';
import Home from '../components/pages/home';
import Dashboard from '../components/pages/dashboard';

export default function HomePage() {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.rootReducer.auth);

  if (isAuthenticated) {
    return (
      <Dashboard />
      // <NavigationContainer>
      //   <DrawerNavigator />
      // </NavigationContainer>
    );
  } {
    return (
      <Home />
    );
  }
}
