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


export default function SignUpScreen() {

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const router = useRouter();

    const validateFirstName = (firstName) => {
        if(!firstName) {
            setFirstNameError("Please enter your first name")
            return false
        }else {
            return true
        }
    }

    const validateLastName = (lastName) => {
        if(!lastName) {
            setLastNameError("Please enter your last name")
            return false
        }else {
            return true
        }
    }

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

    const handleSignUp = () => {
        const firstNameValid = validateFirstName(firstName)
        const lastNameValid = validateLastName(lastName)
        const emailValid = validateEmail(email)
        const passwordValid = validatePassword(password)

        if(emailValid && passwordValid && firstNameValid && lastNameValid) {
            console.log('Login pressed with:', email, password);
        }
      };
    
      const handleGoogleSignUp = () => {
        
        console.log('Google login pressed');
      };
    
      const navigateToLogIn = () => {
        
        router.push('/login');
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
                        <View className="flex gap-4">
                            <View className="flex flex-row gap-6">
                                <View className="flex-1">
                                    <TextInput
                                        className="bg-gray-100 rounded-lg p-4 text-base w-full"
                                        style={{ 
                                            minHeight: 56, 
                                            paddingBottom: 12,
                                            borderWidth: 1,
                                            borderColor: firstNameError ? 'red' : 'transparent' 
                                        }}
                                        placeholder="First name"
                                        placeholderTextColor="#9CA3AF"
                                        value={firstName}
                                        onChangeText={setFirstName}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoComplete="name"
                                        onBlur={() => validateFirstName(firstName)}
                                    />
                                    {/* Fixed height error container */}
                                    <View style={{ height: 20 }}>
                                        {firstNameError ? (
                                            <Text className="text-red-500 text-sm">{firstNameError}</Text>
                                        ) : null}
                                    </View>
                                </View>
                                
                                <View className="flex-1">
                                    <TextInput
                                        className="bg-gray-100 rounded-lg p-4 text-base w-full"
                                        style={{ 
                                            minHeight: 56, 
                                            paddingBottom: 12,
                                            borderWidth: 1,
                                            borderColor: lastNameError ? 'red' : 'transparent' 
                                        }}
                                        placeholder="Last name"
                                        placeholderTextColor="#9CA3AF"
                                        value={lastName}
                                        onChangeText={setLastName}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoComplete="name"
                                        onBlur={() => validateLastName(lastName)}
                                    />
                                    {/* Fixed height error container */}
                                    <View style={{ height: 20 }}>
                                        {lastNameError ? (
                                            <Text className="text-red-500 text-sm">{lastNameError}</Text>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                            
                            <View>
                                <TextInput
                                    className="bg-gray-100 rounded-lg p-4 text-base w-full"
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
                                {/* Fixed height error container */}
                                <View style={{ height: 20 }}>
                                    {emailError ? (
                                        <Text className="text-red-500 text-sm">{emailError}</Text>
                                    ) : null}
                                </View>
                            </View>
                            
                            <View>
                                <TextInput
                                    className="bg-gray-100 rounded-lg p-4 text-base w-full"
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
                                />
                                {/* Fixed height error container */}
                                <View style={{ height: 20 }}>
                                    {passwordError ? (
                                        <Text className="text-red-500 text-sm">{passwordError}</Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity 
                            className="bg-brand rounded-lg p-4 items-center mt-2"
                            onPress={handleSignUp}
                        >
                            <Text className="text-white font-bold text-base">Sign up</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center my-6">
                            <View className="flex-1 h-px bg-gray-200" />
                            <Text className="px-3 text-gray-500 font-medium">OR</Text>
                            <View className="flex-1 h-px bg-gray-200" />
                        </View>
                        <TouchableOpacity 
                            className="border border-gray-200 rounded-lg p-4 items-center flex-row justify-center"
                            onPress={handleGoogleSignUp}
                            >
                            <AntDesign name="google" size={24} color = "black" />
                            <Text className="text-gray-800 font-medium text-base ml-2">Sign up with Google</Text>
                        </TouchableOpacity>
                         <View className="flex-row justify-center mt-10 mb-6">
                            <Text className="text-gray-500 text-sm">Already have an account </Text>
                            <TouchableOpacity onPress={navigateToLogIn}>
                                <Text className="text-brand font-bold text-sm">Log in here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}