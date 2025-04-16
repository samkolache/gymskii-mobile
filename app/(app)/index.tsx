import { View, Text } from 'react-native'
import React from 'react'
import LogoutButton from '@/src/components/LogoutButton'

const index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-4xl'>Logged in</Text>
      <LogoutButton />
    </View>
  )
}

export default index