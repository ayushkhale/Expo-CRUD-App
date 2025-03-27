import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput, Text, Surface, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signupUser } from '../store/slices/authSlice';
import { useRouter } from 'expo-router';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const showAlert = (title, message, onDismiss) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: onDismiss,
          style: 'default',
        },
      ],
      {
        cancelable: false,
        userInterfaceStyle: 'dark',
      }
    );
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showAlert(
        'Missing Information',
        'Please fill in all fields to create your account.',
        () => {}
      );
      return;
    }

    if (!email.includes('@')) {
      showAlert(
        'Invalid Email',
        'Please enter a valid email address.',
        () => {}
      );
      return;
    }

    if (password !== confirmPassword) {
      showAlert(
        'Password Mismatch',
        'The passwords you entered do not match. Please try again.',
        () => {}
      );
      return;
    }

    if (password.length < 6) {
      showAlert(
        'Password Too Short',
        'Your password must be at least 6 characters long for security.',
        () => {}
      );
      return;
    }

    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      showAlert(
        'Account Created',
        'Your account has been created successfully! Please log in to continue.',
        () => router.replace('/login')
      );
    } catch (err) {
      let errorMessage = 'An error occurred during signup. Please try again.';
      if (err.message.includes('Email already exists')) {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (err.message.includes('network')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      }
      showAlert(
        'Signup Failed',
        errorMessage,
        () => {}
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Sign up to get started</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              placeholder="Enter your name"
              left={<TextInput.Icon icon="account" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              left={<TextInput.Icon icon="email" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
              placeholder="Enter your password"
              left={<TextInput.Icon icon="lock" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
              placeholder="Confirm your password"
              left={<TextInput.Icon icon="lock-check" />}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSignup}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              style={styles.textButton}
            >
              <Text style={[styles.textButtonText, { color: theme.colors.primary }]}>
                Already have an account? Sign in
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
    justifyContent: 'center',
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
    marginBottom: 20,
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
  textButton: {
    padding: 12,
    alignItems: 'center',
  },
  textButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignupScreen; 