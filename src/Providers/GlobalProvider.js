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
      !userData.some(element => {
        if (
          element.firstName === data.firstName &&
          element.lastName === data.lastName &&
          element.id === data.id &&
          element.age === data.age
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
