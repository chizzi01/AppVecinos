import React from 'react';
import { View, Text } from 'react-native';
import Sidebar from './Sidebar';
import { NativeRouter as Router, Routes } from 'react-router-native';
import { Route } from 'react-router-native';
import Comercios from './Comercios';
import Servicios from './Servicios';
import Reclamos from './Reclamos';
import Denuncias from './Denuncias';
import Login from './Login';

const Main = () => {
    return (
        <View>
            <Sidebar />
            <Routes>
                <Route path="/comercios" component={Comercios} />
                <Route path="/servicios" component={Servicios} />
                <Route path="/reclamos" component={Reclamos} />
                <Route path="/denuncias" component={Denuncias} />
                <Route path="/login" component={Login} />
            </Routes>
        </View>
    );
};

export default Main;