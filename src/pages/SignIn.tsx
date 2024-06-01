import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App.tsx';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const obSubmit = useCallback(() => {
    if (!email) {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      Alert.alert('비밀번호를 입력해주세요');
      return;
    }
    Alert.alert('로그인 완료');
  }, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = !email && !password;

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput
          value={email}
          placeholder="이메일을 입력해주세요"
          onChangeText={onChangeEmail}
          style={styles.textInput}
          importantForAccessibility="yes"
          autoComplete={'email'}
          textContentType={'emailAddress'}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          keyboardType={'email-address'}
          blurOnSubmit={false}
          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Password</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={onChangePassword}
          style={styles.textInput}
          secureTextEntry={true}
          importantForAccessibility={'yes'}
          autoComplete={'password'}
          textContentType={'password'}
          ref={passwordRef}
          onSubmitEditing={obSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={obSubmit}
          disabled={canGoNext}
          style={
            canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
  },
});

export default SignIn;
