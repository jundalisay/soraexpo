import React from 'react';
import { View, Button, TouchableOpacity,TextInput } from "react-native";
import { MapView,Permissions,Location } from 'expo';
import { SimpleLineIcons,MaterialIcons } from '@expo/vector-icons';

// export class Mapping extends React.Component {
export default class Mapping extends React.Component {

  static navigationOptions = {
    title: 'Map',
    tabBarLabel: 'Map',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <SimpleLineIcons name="map" size={25} color={tintColor} />
    ),
  };

  state = {
    location: {
      latitude: 37.7838,
      longitude: -122.422,
    },
    region: {
      latitude: 37.7838,
      longitude: -122.422,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    locs: [
      {
        latitude: 37.7838,
        longitude: -122.422,
      },
      {
        latitude: 37.7008,
        longitude: -122.102,
      }
    ],
    activeUser: 1
  }

  addLocation(number) {
    
    setTimeout(() => {
      const newLocs = this.state.locs;
      newLocs.push({
        latitude: 37.0 + Math.random(),
        longitude: -122.0 + Math.random(),
      });
      this.setState({ locs: newLocs, activeUser: 2 });
    }, 3000);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    this.setState({ location: location.coords });
  };

  goToMapDetail = (param) => {
    this.props.navigation.navigate('MapDetail', param);
  }

  showAddressInput = () => {
    this.addressInput.setNativeProps({ style: { display: 'flex' } })
  }

  onAddressInput = (text) => {
    Location.geocodeAsync(text).then(locations => {
      if (locations.length > 0) {
        this.setState({ 
          location: {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          },
          region: {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        });
      }
    }).catch(error => console.log(error))
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    // var marker = [];
    // for (var i = 0; i < this.state.locs.length; i++) {
    //   marker.push(
    //     <MapView.Marker
    //       key={i}
    //       title={`Incident here ${i}`}
    //       coordinate={this.state.locs[i]}
    //       onPress={this.goToMapDetail.bind(this, { location: this.state.locs[i]})}
    //     />
    //   );
    // }
    console.log(this.state.location)
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
        >
          {
            this.state.location ? 
            <MapView.Marker
              title={`Incident here`}
              coordinate={this.state.location}
              onPress={this.goToMapDetail.bind(this, { location: this.state.location})}
            />
            : null
          }
          <TouchableOpacity onPress={this._getLocationAsync} style={{ width: 30, height: 30, position: 'absolute', top: 15, right: 15, borderRadius: 15, backgroundColor: 'white', padding: 5 }}>
            <MaterialIcons name="my-location" size={20} color={'grey'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.showAddressInput}
            style={{ width: 30, height: 30, position: 'absolute', bottom: 15, right: 15, borderRadius: 15, backgroundColor: 'white', padding: 5 }}
          >
            <MaterialIcons name="add-location" size={20} color={'grey'} />
          </TouchableOpacity>

          <TextInput
              ref={c => this.addressInput = c}
              style={{ display: 'none', width: 250, height: 35, padding: 5, backgroundColor: '#eee', borderRadius: 5, position: 'absolute', bottom: 15, left: 15 }}
              onChangeText={this.onAddressInput}
          />

        </MapView>

      </View>
      
    );
  }
}
// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { WebBrowser } from 'expo';

// import { MonoText } from '../components/StyledText';

// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//           <View style={styles.welcomeContainer}>
//             <Image
//               source={
//                 __DEV__
//                   ? require('../assets/images/robot-dev.png')
//                   : require('../assets/images/robot-prod.png')
//               }
//               style={styles.welcomeImage}
//             />
//           </View>

//           <View style={styles.getStartedContainer}>
//             {this._maybeRenderDevelopmentModeWarning()}

//             <Text style={styles.getStartedText}>Get started by opening</Text>

//             <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
//               <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
//             </View>

//             <Text style={styles.getStartedText}>
//               Change this text and your app will automatically reload.
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
//               <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

//           <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//             <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   _maybeRenderDevelopmentModeWarning() {
//     if (__DEV__) {
//       const learnMoreButton = (
//         <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//           Learn more
//         </Text>
//       );

//       return (
//         <Text style={styles.developmentModeText}>
//           Development mode is enabled, your app will be slower but you can use useful development
//           tools. {learnMoreButton}
//         </Text>
//       );
//     } else {
//       return (
//         <Text style={styles.developmentModeText}>
//           You are not in development mode, your app will run at full speed.
//         </Text>
//       );
//     }
//   }

//   _handleLearnMorePress = () => {
//     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
//   };

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
