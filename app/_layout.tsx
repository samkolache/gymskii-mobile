import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/src/context/AuthContext";
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '@/src/lib/supabase';

export default function RootLayout() {
  
  useEffect(() => {
    // Set up deep link handler
    const handleDeepLink = (event) => {
      const url = event.url;
      // If this is a Supabase auth redirect, let Supabase handle it
      if (url && url.includes('auth/callback')) {
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            console.log('User signed in via OAuth redirect');
          }
        });
      }
    };

    // Add event listener for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check for initial URL (app opened via deep link)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

   
  return (
    <AuthProvider>
      <Stack initialRouteName="(app)/index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
    
  )
}
