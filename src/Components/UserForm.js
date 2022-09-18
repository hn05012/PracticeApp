import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useGlobal} from '../Providers/GlobalProvider';
import {Formik} from 'formik';
import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  age: yup.string().max(3).required('age is required'),
  id: yup
    .string()
    .max(10)
    .required('7 digit student Id is required, format: az01234'),
});

export default function UserForm({navigation}) {
  const {userData, SetData} = useGlobal();
  return (
    <View style={styles.Container}>
      <Formik
        validationSchema={userValidationSchema}
        initialValues={{firstName: '', lastName: '', age: null, id: ''}}
        onSubmit={values => {
          SetData(values);
          navigation.navigate('UserData');
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <TextInput
              placeholderTextColor="grey"
              name="firstName"
              placeholder="enter your first name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              style={styles.textInput}
            />
            <TextInput
              placeholderTextColor="grey"
              name="lastName"
              placeholder="enter your last name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              style={styles.textInput}
            />
            <TextInput
              placeholderTextColor="grey"
              name="age"
              placeholder="enter your age"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              style={styles.textInput}
            />
            <TextInput
              placeholderTextColor="grey"
              name="id"
              placeholder="enter your id"
              onChangeText={handleChange('id')}
              onBlur={handleBlur('id')}
              value={values.id}
              style={styles.textInput}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    margin: 10,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    justifyContent: 'center',
    borderRadius: 8,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    color: 'black',
  },
});
