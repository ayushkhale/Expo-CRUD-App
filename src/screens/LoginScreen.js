import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { TextInput, Text, Surface, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { isLoading, error } = useSelector((state) => state.auth);

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

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert(
        'Missing Information',
        'Please enter both your email and password to continue.',
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

    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      let errorMessage = 'An error occurred during login. Please try again.';
      if (err.message.includes('Invalid credentials')) {
        errorMessage = 'The email or password you entered is incorrect. Please try again.';
      } else if (err.message.includes('network')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      }
      showAlert(
        'Login Failed',
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
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: theme.colors.text }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
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
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/signup')}
              style={styles.textButton}
            >
              <Text style={[styles.textButtonText, { color: theme.colors.primary }]}>
                Don't have an account? Sign up
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
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
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

export default LoginScreen; 