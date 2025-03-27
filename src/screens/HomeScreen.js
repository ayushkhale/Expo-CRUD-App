import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { FAB, Text, useTheme, Surface, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, logoutUser } from '../store/slices/taskSlice';
import { clearAuth } from '../store/slices/authSlice';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const { token, user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    if (token) {
      await dispatch(fetchTasks(token));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearAuth());
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if server logout fails, clear local state and navigate
      dispatch(clearAuth());
      router.replace('/login');
    }
  };

  const handleAddTask = () => {
    router.push('/add-task');
  };

  const handleTaskPress = (task) => {
    router.push({
      pathname: '/task-details',
      params: { taskId: task._id }
    });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>No Tasks Yet</Text>
      <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>
        Tap the + button to create your first task
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Error loading tasks: {error}
        </Text>
        <TouchableOpacity
          onPress={loadTasks}
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[styles.retryButtonText, { color: theme.colors.background }]}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome, {user?.name || 'User'}!
        </Text>
        <TouchableOpacity 
          onPress={handleLogout}
          style={[styles.logoutButton, { borderColor: theme.colors.primary }]}
        >
          <Text style={[styles.logoutText, { color: theme.colors.primary }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]} elevation={0}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Tasks</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </Text>
      </Surface>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => handleTaskPress(item)}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={renderEmptyState}
          ItemSeparatorComponent={() => (
            <Divider style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          )}
        />
      </KeyboardAvoidingView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAddTask}
        color={theme.colors.background}
        elevation={0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  logoutButton: {
    marginLeft: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    textAlign: 'center',
    margin: 16,
    fontSize: 16,
  },
  retryButton: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  divider: {
    marginVertical: 8,
    height: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen; 