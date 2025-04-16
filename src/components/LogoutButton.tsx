// src/components/LogoutButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

type LogoutButtonProps = {
  className?: string;
  textClassName?: string;
};

export default function LogoutButton({ 
  className = "bg-red-500 rounded-lg p-4 items-center", 
  textClassName = "text-black font-bold text-base" 
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Logout Error', error.message);
      } else {
        
        router.replace('/login');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <TouchableOpacity
      className={className}
      onPress={handleLogout}
      disabled={loading}
      style={{ opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={textClassName}>Logout</Text>
      )}
    </TouchableOpacity>
  );
}