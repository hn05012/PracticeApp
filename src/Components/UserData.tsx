/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, Button, FlatList, ScrollView, CheckBox} from 'react-native';
import {useGlobal} from '../Providers/GlobalProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const UserRowItem = props => {
  // parent container that encapsulates checkbox, user record details and delete button
  return (
    <ScrollView>
      <View style={props.style}>{props.children}</View>
    </ScrollView>
  );
};

const CustomCheckBox = props => {
  return <View>{props.children}</View>; // children can have various types of checkboxes
};

const UserText = props => {
  return (
    <Text
      style={props.style}
      fontSize={props.fontSize}
      lineHeight={props.lineHeight}>
      {props.item.firstName} {props.item.lastName} is {props.item.age} years old
    </Text>
  );
};

const CustomIcon = props => {
  return (
    <View style={props.style} pointerEvents={props.pointerEvents}>
      {props.children}
    </View>
  ); // children can have various types of icons
};

export default function UserData({navigation}) {
  const {userData, DeleteUserInstance, Title} = useGlobal();

  const [isChecked, setIsChecked] = useState([]);

  // useEffect(() => {
  //   console.log('useEffect called');
  //   console.log('isChecked after useEffect called: ', isChecked);
  // }, [isChecked]);

  const isCheckedItems = id => {
    if (isChecked.includes(id)) {
      setIsChecked(current => {
        current.filter(item => item !== id);
      });
      console.log(isChecked.filter(item => item !== id));
    } else {
      setIsChecked([...isChecked, id]);
      console.log(isChecked);
    }
  };

  const Header = props => {
    return <View>{props.children}</View>;
  };

  return (
    <View>
      <Header>
        <Title
          style={{textAlign: 'center', fontSize: 20, color: 'black'}}
          Title="User Data"
        />
        <CustomIcon style={{flexDirection: 'row-reverse'}}>
          <FontAwesome
            name="plus"
            size={25}
            style={{margin: 10}}
            onPress={() => {
              navigation.navigate('UserForm');
            }}
            color="black"
          />
        </CustomIcon>
      </Header>
      <View style={{margin: 10}}>
        <FlatList
          data={userData}
          renderItem={({item}) => (
            <UserRowItem
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomCheckBox>
                <BouncyCheckbox
                  size={25}
                  fillColor="black"
                  onPress={() => {
                    isCheckedItems(item.id);
                  }}
                />
              </CustomCheckBox>
              <UserText
                style={{color: 'black'}}
                fontSize="30"
                lineHeight="30"
                item={item}
              />
              <CustomIcon
                style={{flex: 1, flexDirection: 'row-reverse'}}
                pointerEvents={isChecked.includes(item.id) ? 'none' : 'auto'}>
                <AntDesign
                  name="delete"
                  size={30}
                  onPress={() => {
                    DeleteUserInstance(item.id);
                  }}
                  color={isChecked.includes(item.id) ? 'gray' : 'red'}
                />
              </CustomIcon>
            </UserRowItem>
          )}
        />
      </View>
    </View>
  );
}

// data={userData}
// renderItem={({item}) => (
//   <Item
//     item={item}
//     DeleteItem={DeleteUserInstance}
//     isCheckedItems={isCheckedItems}
//     isChecked={isChecked}
//   />
// )}

// const Item = ({item, DeleteItem, isCheckedItems, isChecked}) => {
//   return (
//     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
//       <View>
//         <BouncyCheckbox
//           size={25}
//           fillColor="black"
//           onPress={() => {
//             isCheckedItems(item.id);
//           }}
//         />
//       </View>
//       <Text style={{color: 'black'}} fontSize="30" lineHeight="30">
//         {item.firstName} {item.lastName} is {item.age} years old
//       </Text>
//       <View
//         style={{flex: 1, flexDirection: 'row-reverse'}}
//         pointerEvents={isChecked.includes(item.id) ? 'none' : 'auto'}>
//         <AntDesign
//           name="delete"
//           size={30}
//           onPress={() => {
//             DeleteItem(item.id);
//           }}
//           color={isChecked.includes(item.id) ? 'gray' : 'red'}
//         />
//       </View>
//     </View>
//   );
// };
