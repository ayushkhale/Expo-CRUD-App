import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../src/store';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useSelector } from 'react-redux';
import { theme } from '../src/theme';

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth screens
      router.replace('/(app)');
    }
  }, [token, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <RootLayoutNav />
      </PaperProvider>
    </StoreProvider>
  );
}
