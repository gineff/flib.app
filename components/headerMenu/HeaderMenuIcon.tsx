import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'

export const HeaderMenuIcon = () => {
  const navigation = useNavigation()

  return (
    <Ionicons
      name="menu"
      size={24}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 10 }}
    />
  )
}
