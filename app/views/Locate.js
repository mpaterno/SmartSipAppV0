//'usestrict'

//APIKeyAIzaSyDCydDhMr-JJhIwuJLz7M9fSxjxzouNkFA

import{ GoogleApiWrapper } from "google-maps-react"

import React, {Component} from "react"
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image,
    Animated
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import CustomText from "../components/CustomText"
import {AnimatedCircularProgress} from "react-native-circular-progress"

import {Provider, Subscribe, Container} from "unstated"
import {
    TestSubscriber,
    DisplayBottleCapacity,
    DisplayDailyGoal,
    DisplayDailyProgress,
    DisplayRemainingBottleCapacity
} from "./Values"


//LogoImplementation
class LogoTitle extends Component {
    render() {
        return (
            <Image
                source={require("../assets/Smart-Sip-Logo.png")}
                style={{width: 50, height: 40}}
            />
        )
    }
}

//variablekeepingtrackifcontainerwithpreviouslocationsisshowingornot,initializedtotrue
//varpreviousLocationsHidden=true

//typeProps={}
class Locate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movementValue: new Animated.Value(100),
            containerHeader: "Presstoseepreviouslocations."
        };

        this.previousLocationsHidden = true
    }

//Forsomereason,becauseit'snotintherender,navigationisnotpartofthis.props.
//Sobasically,I'mpassinginnavigationintotheheader.
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <LogoTitle/>,
            headerRight: (
                <Button
                    onPress={() => navigation.navigate("Values")}
                    title="Edit"
                    color="#777777"
                    style={{paddingRight: "10%"}}
                />
            )
        }
    }

    toggleLocationContainer() {
        this.setState({
            containerHeader: this.previousLocationsHidden ? "Press to hide previous locations" : "Press to see previous locations"
        });

        var toValue = 150;

        if (this.previousLocationsHidden) {
            toValue = 0;
        }

        Animated.spring(
            this.state.movementValue,
            {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8
            }
        ).start();

        this.previousLocationsHidden = !this.previousLocationsHidden;
    }

    render() {
        return (
            <View style = {styles.locationContainer}>
                <Animated.View
                    style={[styles.locationContainer,
                        {transform: [{translateY: this.state.movementValue}]}]}
                >
                    <TouchableHighlight style={styles.button} onPress={() => {
                        this.toggleLocationContainer()
                    }}>
                    <Text style={styles.buttonText}>{this.state.containerHeader}</Text>
                    </TouchableHighlight>
                    <Text style={styles.locations}>613 Gayley Avenue</Text>
                </Animated.View>
            </View>
        );
    }

}

//
//exportclassMapContainerextendsReact.Component{
//render(){
//return(
//<Text>View</Text>
//
////<Map
////google={this.props.google}
////zoom={14}
////style={mapStyles}
////initialCenter={{
////lat:-1.2884,
////lng:36.8233
////}}
/////>
//)
//}
//}
//
const styles = StyleSheet.create({
container:{
//flex:1,
//justifyContent:"center",
//alignItems:"center",
backgroundColor:"#e8f7ff"
},
dashboardSideContainer:{
width:"45%",
margin:5
},
dashboardContainer:{
borderRadius:20,
margin:5,
backgroundColor:"white",
padding:15
},
dashboardH1:{
fontSize:30,
fontWeight:"bold"
},
lightGrey:{
color:"#0000FF"
},
//ForMatt-createastylesheetsothatthecontainerheaderisrightatthebottomfromthebeginning-->remembercannot
//useabsolutevaluesbecausedifferentphoneshavedifferentsizes
locationContainer:{
alignItems:'center',
bottom:-260
},
subView:{
position:"absolute",
backgroundColor:"#FFFFFF",
height:100,
//bottom:120
}
//,
//mapStyle:{
//height:'100%',
//width:'100%'
//}
})
//
//exportdefaultGoogleApiWrapper({
//apiKey:'AIzaSyDCydDhMr-JJhIwuJLz7M9fSxjxzouNkFA'
//})(MapContainer);
//
//AppRegistry.registerComponent('AppContainer',()=>AppContainer);
export default Locate;

// importReact,{Component}from'react';
// import{Map,GoogleApiWrapper}from'google-maps-react';
//
// constmapStyles={
//     width:'100%',
//     height:'100%'
// };
//
// exportclassMapContainerextendsComponent{
//     render(){
//         return(
//             <Map
//                 google={this.props.google}
//                 zoom={14}
//                 style={mapStyles}
//                 initialCenter={{
//                     lat:-1.2884,
//                     lng:36.8233
//                 }}
//             />
//         );
//     }
// }
//
// exportdefaultGoogleApiWrapper({
//     apiKey:'YOUR_GOOGLE_API_KEY_GOES_HERE'
// })(MapContainer);
//
