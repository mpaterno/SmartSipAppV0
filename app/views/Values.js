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
import { Provider, Subscribe, Container } from "unstated"

/* 
This page exists only to manually change the values. We can replace
the inputs with the actual database and water bottle updates once we 
understand those APIs. Also, we may just rid of this page, and inline the
database calls on the homepage. But for now, this shows how to pass data
between functions.
*/

// Test functions are for examples.

class testContainer extends Container {
  state = { count: 0 }
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  }
}

const sharedtestContainer = new testContainer()

export function TestSubscriber() {
  return (
    <Subscribe to={[sharedtestContainer]}>
      {(testSubscriber) => (
        <View>
          <Button title="-" onPress={() => testSubscriber.decrement()} />
          <Text style={{ alignSelf: "center" }}>
            {testSubscriber.state.count}
          </Text>
          <Button title="+" onPress={() => testSubscriber.increment()} />
        </View>
      )}
    </Subscribe>
  )
}

// Actual Classes

// Water Bottle Access Classes

class Bottle extends Container {
  state = { bottleCapacity: 36, remainingCapacity: 36 }
  setCapacity = (bottleCapacity) => {
    this.setState({ bottleCapacity: bottleCapacity })
  }
}
const GlobalBottle = new Bottle()

export class DisplayBottleCapacity extends React.Component {
  render() {
    return (
      <Subscribe to={[GlobalBottle]}>
        {(bottle) => (
          <View>
            <CustomText style={this.props.style}>
              {bottle.state.bottleCapacity} oz
            </CustomText>
          </View>
        )}
      </Subscribe>
    )
  }
}

function ChangeBottleCapacity() {
  return (
    <Subscribe to={[GlobalBottle]}>
      {(bottle) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Change Water Bottle Capacity."
            value={bottle.state.bottleCapacity}
            onSubmitEditing={
              (event) => bottle.setCapacity(event.nativeEvent.text) // Note this complicated syntax.
            }
          />
          <CustomText>{bottle.state.bottleCapacity}</CustomText>
        </View>
      )}
    </Subscribe>
  )
}

// User Classes

class User extends Container {
  state = { dailyGoal: 36, amountConsumed: 0 }
  changeGoal = (dailyGoal) => {
    this.setState({ dailyGoal: dailyGoal })
  }
  changeConsumption = (amountConsumed) => {
    this.setState({ amountConsumed: amountConsumed })
  }
}
const GlobalUser = new User()

export class DisplayDailyGoal extends React.Component {
  render() {
    return (
      <Subscribe to={[GlobalUser]}>
        {(user) => (
          <View>
            <CustomText style={this.props.style}>
              {user.state.dailyGoal} oz
            </CustomText>
          </View>
        )}
      </Subscribe>
    )
  }
}

function ChangeDailyGoal() {
  return (
    <Subscribe to={[GlobalUser]}>
      {(user) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Change Users Daily Goal."
            value={user.state.bottleCapacity}
            onSubmitEditing={
              (event) => user.changeGoal(event.nativeEvent.text) // Note this complicated syntax.
            }
          />
          <CustomText>{user.state.dailyGoal}</CustomText>
        </View>
      )}
    </Subscribe>
  )
}

function ChangeConsumption() {
  return (
    <Subscribe to={[GlobalUser]}>
      {(user) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Change the amount of water consumed."
            value={user.state.amountConsumed}
            onSubmitEditing={
              (event) => user.changeConsumption(event.nativeEvent.text) // Note this complicated syntax.
            }
          />
          <CustomText>{user.state.amountConsumed}</CustomText>
        </View>
      )}
    </Subscribe>
  )
}

export class DisplayDailyProgress extends React.Component {
  amountLeft(amountConsumed, dailyGoal) {
    return dailyGoal - amountConsumed
  }

  render() {
    return (
      <Subscribe to={[GlobalUser]}>
        {(user) => (
          <View style={{ backgroundColor: "white", padding: "5%" }}>
            {/* Use CustomText to apply a global font style. */}
            <CustomText style={{ fontSize: 36, fontWeight: "bold" }}>
              {this.amountLeft(user.state.amountConsumed, user.state.dailyGoal)}{" "}
              oz to Go!
            </CustomText>
            <CustomText style={{ fontSize: 24, fontWeight: "bold" }}>
              {user.state.amountConsumed} oz
            </CustomText>
          </View>
        )}
      </Subscribe>
    )
  }
}

type Props = {}
export default class Values extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = { bottleCapacity: "" }
  }
  render() {
    return (
      <View style={styles.container}>
        <Provider>
          <ChangeBottleCapacity />
          <ChangeDailyGoal />
          <ChangeConsumption />
        </Provider>

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
