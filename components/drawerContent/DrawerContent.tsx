import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import Drawer from 'expo-router/drawer'

export const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}>
        <Drawer.Screen
          name="/(home)/newBooks"
          options={{
            drawerLabel: 'Новые книги',
          }}
        />
        <Drawer.Screen
          name="/(home)/popularDay"
          options={{
            drawerLabel: 'Популярные за день',
          }}
        />
        <Drawer.Screen
          name="/(home)/popularWeek"
          options={{
            drawerLabel: 'Популярные за неделю',
          }}
        />
        <Drawer.Screen
          name="/(home)/search"
          options={{
            drawerLabel: 'Поиск книг',
          }}
        />
        <Drawer.Screen
          name="/(home)/settings"
          options={{
            drawerLabel: 'Настройки',
          }}
        />
      </DrawerItemList>
    </DrawerContentScrollView>
  )
}
