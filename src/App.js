import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {Button} from 'native-base';

const App: () => React$Node = () => {
  const [latitude, setLatitude] = React.useState(null);
  const [longtitude, setLongtitude] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [date, setDate] = React.useState(null);

  const {TestModule} = NativeModules;

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.TestModule);

    // Listener for recieve data from native activity
    const eventListener = eventEmitter.addListener(
      'onUpdateMarkerCoordinates',
      (event) => {
        // Set latitude and longtitude in state
        if (event.coordinates) {
          [lat, long] = event.coordinates.split(',');
          setLatitude(lat);
          setLongtitude(long);
        }

        // Set address in state
        if (event.address) {
          setAddress(event.address);
        }
      },
    );
  });

  const onPressCalendarButton = async () => {
    const currentDate = await TestModule.getCurrentNativeDate();
    setDate(currentDate);
  };

  const onPressMapButton = () => {
    if (latitude !== null && longtitude !== null) {
      TestModule.showNativeMap(String(latitude + ',' + longtitude));
    } else {
      TestModule.showNativeMap('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerCard}>
        <Text style={styles.headerCardText}>
          Тестовое задание для <Text style={styles.hightlight}>FITTIN</Text>
        </Text>
      </View>
      <View style={styles.options}>
        <Button
          block
          rounded
          style={styles.button}
          buttonStyle={styles.button}
          onPress={onPressCalendarButton}>
          <Text>Calendar</Text>
        </Button>
        {date && <Text style={styles.markerCoord}>Current date: {date}</Text>}
        <Button
          block
          rounded
          style={styles.button}
          buttonStyle={styles.button}
          onPress={onPressMapButton}>
          <Text>Google Map</Text>
        </Button>
      </View>
      <View style={styles.markerCard}>
        {latitude && (
          <Text style={styles.markerCoord}>Marker latitude: {latitude}</Text>
        )}
        {longtitude && (
          <Text style={styles.markerCoord}>
            Marker longtitude: {longtitude}
          </Text>
        )}
        {address && <Text style={styles.markerCoord}>Address: {address}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
  },

  headerCard: {
    height: 200,
    alignItems: 'center',
    paddingTop: 30,
  },

  headerCardText: {
    fontSize: 40,
  },

  hightlight: {
    color: 'orange',
  },

  options: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  button: {
    backgroundColor: 'orange',
  },

  markerCard: {
    height: 100,
  },

  markerCoord: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default App;
