import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import Comercios from './Comercios';
import Servicios from './Servicios';
import Reclamos from './Reclamos';
import Denuncias from './Denuncias';
import Login from './Login';
import Home from './Home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <DrawerItem label="Login" onPress={() => props.navigation.navigate('Login')} />
      </View>
    </DrawerContentScrollView>
  );
}

const Sidebar = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Comercios" component={Home} />
      <Drawer.Screen name="Comercios" component={Comercios} />
      <Drawer.Screen name="Servicios" component={Servicios} />
      <Drawer.Screen name="Reclamos" component={Reclamos} />
      <Drawer.Screen name="Denuncias" component={Denuncias} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

export default Sidebar;