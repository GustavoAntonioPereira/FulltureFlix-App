import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <StatusBar style="auto" />
        <Drawer.Screen name="index" options={{ title: 'FulltureFlix' }} />
        <Drawer.Screen name="search" options={{ title: 'Search' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
