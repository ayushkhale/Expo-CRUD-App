import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';

const TaskItem = ({ task, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={0}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});

export default TaskItem; 