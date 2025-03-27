import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../store/slices/taskSlice';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const tasks = useSelector(state => state.tasks.tasks);
  const task = tasks.find(t => t._id === taskId);
  const token = useSelector(state => state.auth.token);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      console.log('Task found:', task);
      setTitle(task.title);
      setDescription(task.description || '');
    } else {
      console.log('Task not found for ID:', taskId);
      console.log('Available tasks:', tasks);
    }
  }, [task, taskId, tasks]);

  const showAlert = (title, message, onPress) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress }],
      { cancelable: false }
    );
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      showAlert(
        'Invalid Input',
        'Please enter a title for the task.',
        () => {}
      );
      return;
    }

    try {
      console.log('Updating task:', {
        taskId: task._id,
        updates: { title, description },
        token
      });

      const result = await dispatch(updateTask({
        taskId: task._id,
        updates: { title, description },
        token
      })).unwrap();

      console.log('Update result:', result);
      showAlert(
        'Success',
        'Task updated successfully.',
        () => {}
      );
    } catch (error) {
      console.error('Update error:', error);
      showAlert(
        'Update Failed',
        error.message || 'Failed to update task. Please try again.',
        () => {}
      );
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteTask({ taskId: task._id, token })).unwrap();
              router.back();
            } catch (error) {
              showAlert(
                'Delete Failed',
                error.message || 'Failed to delete task. Please try again.',
                () => {}
              );
            }
          },
        },
      ]
    );
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Task Details</Text>
          <Text style={styles.headerSubtitle}>Edit the task details below</Text>
        </View>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: theme.colors.primary } }}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={4}
          theme={{ colors: { primary: theme.colors.primary } }}
        />
        <View style={styles.metadata}>
          <Text style={styles.metadataText}>
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.metadataText}>
            Status: {task.status}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Actions</Text>
          <TouchableOpacity
            onPress={handleUpdate}
            style={[styles.updateButton, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.background }]}>
              Update Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.background }]}>
              Delete Task
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888888',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#2a2a2a',
  },
  metadata: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  metadataText: {
    color: '#ffffff',
    marginBottom: 8,
  },
  actionsContainer: {
    marginTop: 24,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  updateButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 