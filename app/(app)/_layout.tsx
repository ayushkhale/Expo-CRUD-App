import { Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../src/store/slices/authSlice';

export default function AppLayout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace('/login');
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-task" />
      <Stack.Screen name="task-details" />
    </Stack>
  );
} 