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
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handleSignUp = () => {
        
        console.log('Login pressed with:', email, password);
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
                       
                        <View className="flex flex-row gap-6 ">
                            <TextInput
                                className="bg-gray-100 rounded-lg p-4 mb-4 text-base flex-1"
                                style={{ minHeight: 56, paddingBottom: 12 }}
                                placeholder="First name"
                                placeholderTextColor="#9CA3AF"
                                value={firstName}
                                onChangeText={setFirstName}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoComplete="name"
                            />
                            <TextInput
                                className="bg-gray-100 rounded-lg p-4 mb-4 text-base flex-1"
                                style={{ minHeight: 56, paddingBottom: 12 }}
                                placeholder="Last name"
                                placeholderTextColor="#9CA3AF"
                                value={lastName}
                                onChangeText={setLastName}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoComplete="name"
                            />
                        </View>
                        <TextInput
                            className="bg-gray-100 rounded-lg p-4 mb-4 text-base"
                            style={{ minHeight: 56, paddingBottom: 12 }}
                            placeholder="Email"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                         <TextInput
                            className="bg-gray-100 rounded-lg p-4 mb-4 text-base"
                            style={{ minHeight: 56, paddingBottom: 12 }}
                            placeholder="Password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
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