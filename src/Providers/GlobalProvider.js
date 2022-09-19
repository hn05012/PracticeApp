import React, {useState, createContext, useContext} from 'react';
import {View, Text, Alert} from 'react-native';

const GlobalContext = createContext();
const GlobalProvider = ({children}) => {
  const [userData, setUserData] = useState([]);

  const Title = props => {
    return (
      <View>
        <Text style={props.style}>{props.Title}</Text>
      </View>
    );
  };

  const SetData = data => {
    if (
      // checks if user record already exists in array of records
      !userData.some(element => {
        // converting all strings to lowercase and removing spaces before performing the check
        const elementFirstName = element.firstName.trim().toLowerCase();
        const elementLastName = element.lastName.trim().toLowerCase();
        const elementAge = element.age.trim().toLowerCase();
        const elementId = element.id.trim().toLowerCase();
        const dataFirstName = data.firstName.trim().toLowerCase();
        const dataLastName = data.lastName.trim().toLowerCase();
        const dataAge = data.age.trim().toLowerCase();
        const dataId = data.id.trim().toLowerCase();
        if (
          elementFirstName === dataFirstName &&
          elementLastName === dataLastName &&
          elementId === dataId &&
          elementAge === dataAge
        ) {
          return true;
        }
      })
    ) {
      setUserData([...userData, data]);
    } else {
      Alert.alert('User Record Already exists');
    }
  };

  const ClearUserData = () => {
    setUserData([]);
  };

  const DeleteUserInstance = id => {
    // deletes user record based on user.id
    setUserData(current =>
      current.filter(user => {
        return user.id !== id;
      }),
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        userData,
        setUserData,
        SetData,
        ClearUserData,
        DeleteUserInstance,
        Title,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
const useGlobal = () => {
  const global = useContext(GlobalContext);
  if (global == null) {
    throw new Error('useGlobal() called outside of a GlobalProvider?');
  }
  return global;
};
export {GlobalProvider, useGlobal};
