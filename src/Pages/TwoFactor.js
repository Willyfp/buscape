import React, { useState, useRef} from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '/buscape/src/config/firebase';
import { Alert } from 'react-native';

export default function TwoFactor(){

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  
    const sendVerification = () => {
        
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phone = "+55" + phoneNumber;

      phoneProvider
        .verifyPhoneNumber(phone, recaptchaVerifier.current)
        .then(setVerificationId);
    };
  
    const confirmCode = () => {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
            alert("Logado com Sucesso!");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
            // ..
        });
    };
  

    return (

        <ScrollView style={styles.background}>
            
            <View style={styles.container}>
                
                <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                />

                <Text style={styles.Title}>
                    Insira seu telefone Para a autenticação de dois fatores!
                </Text>

                <TextInput
                placeholder="Celular (com DDD)"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                style={styles.input}
                />

                <TouchableOpacity
                style={styles.btnSubmit}
                onPress={sendVerification}
                >
                <Text style={styles.SubmitText}>Enviar código</Text>
                </TouchableOpacity>

                <TextInput
                placeholder="Confirmation Code"
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.input}
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={confirmCode}>
                <Text style={styles.SubmitText}>Confirmar código</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background:{
        backgroundColor: '#206164',
    },
     
    container:{
        flex:1,
        marginTop: 200, 
        alignItems:'center',
        width: '100%',

    },

    input:{
        backgroundColor: '#FFF',
        width: '80%',
        color: 'black',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        margin: 20
    },

    btnSubmit: {
        backgroundColor: '#07A7AD',
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    SubmitText:{
        color: '#FFF',
        fontSize: 18,
    },

    Title:{
        textAlign: 'center',
        width: '80%',
        fontSize: 36,
        color: '#FFF',
        marginBottom: 10
    }
})

