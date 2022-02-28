//import liraries
import { Card, Flex, WingBlank } from '@ant-design/react-native';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import colors from '../../common/constant/colors';
import font from '../../common/constant/font';
import mainStyle from '../../common/constant/mainStyle';

const List = ({ title, iconName }) => (
  <>
    <WingBlank size="md">
      <Flex>
        <Flex.Item style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={iconName} type="font-awesome" color={colors.green} style={{ marginRight: 12 }} size={14} />
          <Text style={styles.locationLbl}>{title}</Text>
        </Flex.Item>
        <Flex.Item style={{ alignItems: 'flex-end' }}>
          <Icon name="chevron-right" type="octicons" color={colors.green} />
        </Flex.Item>
      </Flex>
    </WingBlank>
    <Divider style={styles.divider} />
  </>
);

// create a component
const StoreInfoCard = () => {
  return (
    <WingBlank size="lg" style={styles.main}>
      <Card style={styles.container}>
        <WingBlank size="lg">
          <Flex>
            <Flex.Item>
              <Text style={styles.storeLbl}>Betty Store</Text>
            </Flex.Item>
            <Flex.Item>
              <Rating showRating type="star" fractions={1} startingValue={4.9} imageSize={10} />
            </Flex.Item>
          </Flex>
        </WingBlank>
        <Divider style={styles.divider} />
        <List title="566 Vicente Cruz St. Sampaloc Manila" iconName="location-arrow" />
        <List title="+2315562 | 09214256243" iconName="phone" />
        <List title="9AM - 11PM | Every Weekdays" iconName="calendar" />
      </Card>
    </WingBlank>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: {
    top: -18,
  },
  container: {
    ...mainStyle.styles.shadow,
    borderRadius: 8,
  },
  storeLbl: {
    fontFamily: font.regular,
    fontSize: 28,
  },
  divider: {
    margin: 8,
  },
  locationLbl: {
    fontFamily: font.regular,
    fontSize: 10,
    color: colors.MidGrey,
  },
});

//make this component available to the app
export default StoreInfoCard;
