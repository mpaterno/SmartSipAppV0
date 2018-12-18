/** @format
 * @flow
 * /
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Image
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import CustomText from "../components/CustomText"

/* 
This page exists only to manually change the values. We can replace
the inputs with the actual database and water bottle updates once we 
understand those APIs. Also, we may just rid of this page, and inline the
database calls on the homepage. But for now, this shows how to pass data
between functions.
*/

type Props = {}
export default class Values extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = { bottleCapacity: "" }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.bottleCapacity}</Text>
        <TextInput
          placeholder="Change Water Bottle Capacity."
          onChangeText={(bottleCapacity) => this.setState({ bottleCapacity })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
