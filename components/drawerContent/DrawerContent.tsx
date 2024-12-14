import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'

export const DrawerContent = (props: any) => {
  const router = useRouter()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Новые книги"
        onPress={() => router.navigate('/(home)/list/newBooks')}
      />
      <DrawerItem
        label="Популярные за день"
        onPress={() => router.navigate('/(home)/list/popularDay')}
      />
      <DrawerItem
        label="Популярные за неделю"
        onPress={() => router.navigate('/(home)/list/popularWeek')}
      />
      <DrawerItem
        label="Поиск книги"
        onPress={() => router.navigate('/(home)/search')}
      />
      <DrawerItem
        label="Настройки"
        onPress={() => router.navigate('/(home)/settings')}
      />
    </DrawerContentScrollView>
  )
}
