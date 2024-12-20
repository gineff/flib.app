import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { toJS } from 'mobx'
import { listsStore } from '@/stores/lists'
import { observer } from 'mobx-react-lite'

const BooksListPage = observer(() => {
  const router = useRouter()
  const { name } = useLocalSearchParams()
  const list = listsStore.getList('newBooks')

  useEffect(() => {
    list.fetch(8)
  }, [list])

  console.log(toJS(list))

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Категория: {name}</Text>
      <FlatList
        data={list.bookCores}
        renderItem={({ item: [id] }) => (
          <Text style={{ color: 'blue', marginTop: 20 }}>Книга {id}</Text>
        )}
      />
    </View>
  )
})

export default BooksListPage
