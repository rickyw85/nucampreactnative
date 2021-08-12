import React, { Component } from "react";
import Home from "./HomeComponent";
import Listings from "./ListingsComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Reservation from "./ReservationComponent";
import HouseInfo from "./HouseInfoComponent";
import Favorites from "./FavoritesComponent";
import Constants from "expo-constants";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import {
  fetchHouses,
  fetchReviews,
  fetchNewton,
  fetchVendors,
} from "../redux/ActionCreators";
import NetInfo from "@react-native-community/netinfo";

const mapDispatchToProps = {
  fetchHouses,
  fetchReviews,
  fetchNewton,
  fetchVendors,
};

const ListingsNavigator = createStackNavigator(
  {
    Listings: {
      screen: Listings,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="smile-o"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    HouseInfo: { screen: HouseInfo },
  },
  {
    initialRouteName: "Listings",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
    },
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
      headerLeft: (
        <Icon
          name="hand-spock-o"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
      headerLeft: (
        <Icon
          name="phone"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
      headerLeft: (
        <Icon
          name="calendar"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "steelblue",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        color: "darkblue",
      },
      headerLeft: (
        <Icon
          name="heartbeat"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/hands.jpg")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Newton Camp Realty</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Listings: {
      screen: ListingsNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="smile-o" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: "Reservation",
        drawerIcon: ({ tintColor }) => (
          <Icon name="calendar" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: "My Favorites",
        drawerIcon: ({ tintColor }) => (
          <Icon name="heartbeat" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "About Newt",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="hand-spock-o"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="phone"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    drawerBackgroundColor: "whitesmoke",
    contentComponent: CustomDrawerContentComponent,
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  componentDidMount() {
    this.props.fetchHouses();
    this.props.fetchReviews();
    this.props.fetchNewton();
    this.props.fetchVendors();

    NetInfo.fetch().then((connectionInfo) => {
      Platform.OS === "ios"
        ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
        : ToastAndroid.show("Initial Network Connectivity Type: " + 
            connectionInfo.type, ToastAndroid.LONG);
    });

    this.unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      this.handleConnectivityChange(connectionInfo);
    });
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo();
  }

  handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    (Platform.OS === "ios")
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "steelblue",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "darkblue",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "darkblue",
    fontSize: 30,
  },
});

export default connect(null, mapDispatchToProps)(Main);
