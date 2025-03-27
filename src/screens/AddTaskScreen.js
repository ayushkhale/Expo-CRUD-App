import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Text, Surface, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/slices/taskSlice';
import { useRouter } from 'expo-router';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    if (!title.trim()) {
      return;
    }
    await dispatch(addTask({ title, description }, token));
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Add New Task</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Create a new task to manage</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
              placeholder="Enter task title"
              left={<TextInput.Icon icon="format-title" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={6}
              placeholder="Enter task description"
              left={<TextInput.Icon icon="text-box" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.button,
                { backgroundColor: theme.colors.primary },
                !title.trim() && { opacity: 0.5 }
              ]}
              disabled={!title.trim()}
            >
              <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                Create Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.outlineButton, { borderColor: theme.colors.primary }]}
            >
              <Text style={[styles.outlineButtonText, { color: theme.colors.primary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  surface: {
    flex: 1,
    padding: 20,
    margin: 20,
    borderRadius: 16,
    elevation: 0,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTaskScreen; 