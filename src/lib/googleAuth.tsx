// src/lib/googleAuth.ts
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from './supabase';
import * as Linking from 'expo-linking';


WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
 
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: makeRedirectUri({
        
        scheme: 'gymskii',
      }),
      queryParams: {
       
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('OAuth error:', error);
    return { error };
  }

  
  if (data?.url) {
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      makeRedirectUri({ scheme: 'yourapp' })
    );

    if (result.type === 'success') {
    
      const url = result.url;
   
      return { success: true, url };
    }
  }

  return { error: new Error('Failed to sign in with Google') };
}