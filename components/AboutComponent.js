import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    vendors: state.vendors,
  };
};

function Mission() {
  return (
    <Card title="Who is Newton Camp?">
      <Text style={{ margin: 10 }}>
      Three time Real Estate Agent in the Tristate Region of the Year Newton Camp is a family man that happens to sell houses. Camp entered the real estate industry thirteen years ago after losing his mother to heart disease. Camp vowed to live a healthier and prosperous life in his mother's spirit. He has since been the most sought after real estate agent in all of California. His methods are proven with financial proof. Camp can and will get you the house you want. He is never out bid. His strengths are mirrored in his power to sell. Camp has never met a house that he could not sell. At the end of the day, Newton Camp just wants to go home to his loving wife and two and a half precious children. With them, he practices his favorite hobby of woodworking and carpentry.
      </Text>
    </Card>
  );
}

class About extends Component {
  static navigationOptions = {
    title: "About Newton Camp",
  };

  render() {
    const renderVendor = ({ item }) => {
      return (
        <ListItem
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    if (this.props.vendors.isLoading) {
      return (
        <ScrollView>
            <Mission />
            <Card 
              title="Local Vendors">
              <Loading />
            </Card>
        </ScrollView>
      );
    }
    if (this.props.vendors.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Mission />
            <Card 
              title="Local Vendors">
              <Text>{this.props.vendors.errMess}</Text>
            </Card>
          </Animatable.View>    
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Mission />
          <Card title="Local Vendors">
            <FlatList
              data={this.props.vendors.vendors}
              renderItem={renderVendor}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
