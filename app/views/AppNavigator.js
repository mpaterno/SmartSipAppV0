import { createStackNavigator, createAppContainer } from "react-navigation"
import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, Image } from "react-native"
import App from "./App"
import Home from "./Home"
import Friends from "./Friends"
import Values from "./Values"
import Locate from "./Locate"

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Friends: {
    screen: Friends
  },
  Values: {
    screen: Values
  },
  Locate: {
    screen: Locate
  }
})
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
