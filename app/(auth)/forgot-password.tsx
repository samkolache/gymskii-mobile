import { useState } from "react";
import { useRouter } from "expo-router";
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
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
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

    const handlePasswordReset = () => {
        const isEmailValid = validateEmail(email)
        if(isEmailValid) {
            console.log('Reset link sent to:', email);
        }else {
            console.log('Validation Failed')
        }
        
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 p-6">
                    <View className="items-center mt-10 mb-12">
                        <Image 
                            source={require('../../src/assets/logo.png')}
                            className="w-24 h-24"
                            resizeMode="contain"
                        />
                    </View>
                    <View className="mb-10">
                        <Text className="text-4xl font-bold mb-4">Forgot Password</Text>
                        <Text className="text-gray-600 text-base">
                            Forgot your password? Enter your email below to receive a link to change your password!
                        </Text>
                    </View>
                    <View className="mb-8">
                        {emailError ? (
                            <Text className="text-red-500 text-sm mb-2">{emailError}</Text>
                        ) : null}
                        <TextInput
                            className="bg-gray-100 rounded-lg p-4 text-base"
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
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onBlur = {() => validateEmail(email)}
                        />
                    </View>
                    <TouchableOpacity 
                        className="bg-brand rounded-lg p-4 items-center"
                        onPress={handlePasswordReset}
                    >
                        <Text className="text-white font-bold text-base">Email reset link</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}