import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Inscription</Text>
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Confirmer le mot de passe"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={{ width: '80%', height: 50, backgroundColor: '#007bff', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
