import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    houses: state.houses,
  };
};

class Listings extends Component {
  static navigationOptions = {
    title: "Listings",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderListingsItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInLeft" duration={3000}>
          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate("HouseInfo", { houseId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (this.props.houses.isLoading) {
      return <Loading />;
    }
    if (this.props.houses.errMess) {
      return (
        <View>
          <Text>{this.props.houses.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.houses.houses}
        renderItem={renderListingsItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Listings);
