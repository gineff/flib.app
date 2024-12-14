import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { HeaderMenuIcon } from '@/components/headerMenu'

const HomeLayout = () => {
  const { name } = useLocalSearchParams()

  return (
    <Stack>
      <Stack.Screen
        name="list/[name]"
        options={{
          title: (name as string) || 'Список',
          headerLeft: () => <HeaderMenuIcon />,
        }}
      />
    </Stack>
  )
}

export default HomeLayout
