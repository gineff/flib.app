import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

const BooksListPage = () => {
  const router = useRouter()
  const { name } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Категория: {name}</Text>
      <Text
        style={{ color: 'blue', marginTop: 20 }}
        onPress={() => router.push('/(home)/book/4')}
      >
        Перейти к книге 4
      </Text>
    </View>
  )
}

export default BooksListPage
