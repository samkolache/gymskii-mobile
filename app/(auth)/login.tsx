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
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [password, setPassword] = useState('');
  const router = useRouter();

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

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      // Proceed with login
      console.log('Login pressed with:', email, password);
      // Your authentication logic here
    } else {
      console.log('Validation failed');
    }
  };

  const handleGoogleLogin = () => {
    
    console.log('Google login pressed');
  };

  const navigateToSignup = () => {
    
    router.push('/sign-up');
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
              onBlur = {() => validatePassword(password)}
            />
            <TouchableOpacity 
              className="bg-brand rounded-lg p-4 items-center mt-2"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">Log In</Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-3 text-gray-500 font-medium">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <TouchableOpacity 
              className="border border-gray-200 rounded-lg p-4 items-center flex-row justify-center"
              onPress={handleGoogleLogin}
            >
              <AntDesign name="google" size={24} color = "black" />
              <Text className="text-gray-800 font-medium text-base ml-2">Sign in with Google</Text>
            </TouchableOpacity>
            
          <View className="flex-row justify-center mt-10 mb-6">
            <Text className="text-gray-500 text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignup}>
              <Text className="text-brand font-bold text-sm">Sign up here</Text>
            </TouchableOpacity>
          </View>
          </View>

          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}