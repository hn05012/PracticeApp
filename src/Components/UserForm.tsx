/* eslint-disable react-native/no-inline-styles */
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

const userValidationSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('First Name is required')
      .label('First Name')
      .trim(),

    lastName: yup
      .string()
      .required('Last Name is required')
      .label('Last Name')
      .trim(),

    age: yup.string().max(3).required('age is required').label('Age').trim(),

    id: yup
      .string()
      .max(10)
      .required('7 digit student Id is required, format: az01234')
      .label('Student Id')
      .trim(),
  })
  .test(
    'global-ok',
    'you do not fulfill the requirements',
    (firstName, lastName, age, id) => {},
  );

export default function UserForm({navigation}) {
  const {SetData} = useGlobal();
  return (
    <View style={styles.Container}>
      <Formik
        validationSchema={userValidationSchema}
        initialValues={{firstName: '', lastName: '', age: '', id: ''}}
        onSubmit={values => {
          SetData(values);
          navigation.navigate('UserData');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          values,
        }) => (
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
            {errors.firstName && touched.firstName ? (
              <Text style={{color: 'grey'}}>{errors.firstName}</Text>
            ) : null}
            <TextInput
              placeholderTextColor="grey"
              name="lastName"
              placeholder="enter your last name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              style={styles.textInput}
            />
            {errors.lastName && touched.lastName ? (
              <Text style={{color: 'grey'}}>{errors.lastName}</Text>
            ) : null}
            <TextInput
              placeholderTextColor="grey"
              name="age"
              placeholder="enter your age"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              style={styles.textInput}
            />
            {errors.age && touched.age ? (
              <Text style={{color: 'grey'}}>{errors.age}</Text>
            ) : null}
            <TextInput
              placeholderTextColor="grey"
              name="id"
              placeholder="enter your id"
              onChangeText={handleChange('id')}
              onBlur={handleBlur('id')}
              value={values.id}
              style={styles.textInput}
            />
            {errors.id && touched.id ? (
              <Text style={{color: 'grey'}}>{errors.id}</Text>
            ) : null}
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
