import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/components/useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: 0 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF9800',
        tabBarInactiveTintColor: '#000000ff',
        tabBarStyle: { backgroundColor: '#ffffffff', shadowOpacity: 0, borderTopWidth: 0 },
        headerStyle: { 
          backgroundColor: '#E0F7FA',   // cor do fundo
          elevation: 0,                   // remove sombra no Android
          shadowOpacity: 0,               // remove sombra no iOS
        },
        headerTitleStyle: {
          marginTop: 16,
          color: '#000000ff',               // cor do título
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}>
      <Tabs.Screen
        name="index"   // SolSeguro
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index1"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          /*headerLeft: () => (  
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={70}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),*/
    }}
  />
    </Tabs>
  );
}
