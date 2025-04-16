import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '@/src/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const session  = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  async function handleLogin() {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          Alert.alert('Login Error', error.message);
        }
      } catch (error) {
        console.error('Login error:', error.message);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Validation failed');
    }
  }

  const handleGoogleLogin = async () => {
    
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View className="flex-1 p-6 justify-evenly">
          <View className="items-center justify-center">
            <Image 
            source={require('../../src/assets/logo.png')}
            className='w-52 h-24'
            resizeMode='contain'
            />
          </View>

          
          <View className="w-full">
          {emailError ? (
              <Text className="text-red-500 text-sm mb-2">{emailError}</Text>
            ) : null}
            <TextInput
              className="bg-gray-100 rounded-lg p-4  mb-4 text-base"
              style={{ 
                minHeight: 56, 
                paddingBottom: 12,
                borderWidth: 1,
                borderColor: emailError ? 'red' : 'transparent'

              
              }}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onBlur={() => validateEmail(email)}
              editable={!loading}
            />
            {passwordError ? (
              <Text className="text-red-500 text-sm mb-2">{passwordError}</Text>
            ) : null}
            <TextInput
              className="bg-gray-100 rounded-lg p-4 mb-4 text-base"
              style={{ 
                minHeight: 56, 
                paddingBottom: 12,
                borderWidth: 1,
                borderColor: passwordError ? 'red' : 'transparent'
              }}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              onBlur={() => validatePassword(password)}
              editable={!loading}
            />
            <TouchableOpacity 
              className="bg-brand rounded-lg p-4 items-center mt-2"
              onPress={handleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <Text className="text-white font-bold text-base">
                {loading ? 'Logging in...' : 'Log In'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-3 text-gray-500 font-medium">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <TouchableOpacity 
              className="border border-gray-200 rounded-lg p-4 items-center flex-row justify-center"
              onPress={handleGoogleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <AntDesign name="google" size={24} color="black" />
              <Text className="text-gray-800 font-medium text-base ml-2">
                {loading ? 'Processing...' : 'Sign in with Google'}
              </Text>
            </TouchableOpacity>
            
          <View className="flex-row justify-center mt-10 mb-6">
            <Text className="text-gray-500 text-sm">Don't have an account? </Text>
              <Link href = "/sign-up" className="text-brand font-bold text-sm">Sign up here</Link>
          </View>
          </View>

          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}