import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import * as yup from 'yup';
import firebase from '/buscape/src/config/firebase';
import { cpf } from 'cpf-cnpj-validator'; 
import { number } from 'yup/lib/locale';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const registerValidationSchema = yup.object().shape({
    nome: yup
        .string()
        .min(3, ({ min }) => 'O nome deve conter no mínimo 3 caracteres!')
        .required('Este campo é obrigatório!'),
    
    email: yup
        .string()
        .email("Insira um email valido!")
        .required('Este campo é obrigatório!'),

    nascimento: yup
        .string()
        .required('Este campo é obrigatório!')
        .min(10, ({ min }) => 'Data inválida!'),

    celular: yup
        .string()
        .required('Este campo é obrigatório!'),

    cpf: yup
        .string()
        .test('cpfIsValid', 'CPF Inválido!', async function(values) {

            const cpfIsValid = cpf.isValid(this.parent.cpf)

            if(cpfIsValid){
                return true
            } else{
                return false
            }
        })
        .required('Este campo é obrigatório!'),

    senha: yup
        .string()
        .min(8, ({ min }) => 'A senha deve ter no mínimo 8 caracteres!')
        .required('Este campo é obrigatório!'),

    confirmSenha: yup
        .string()
        .oneOf([yup.ref('senha'), null],'As senhas devem ser iguais!'),
})

export default function Registrar(){
 
  const navigation = useNavigation();

    function registerFirebase(values){
        firebase.auth().createUserWithEmailAndPassword(values.email, values.senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Registrado com sucesso!");
            navigation.navigate('TwoFactor');
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode, errorMessage)
        });
    }

    return (

        <ScrollView style={styles.background}>
            
            <View style={styles.viewForm}>
                <Image style={{
                    width: 100,
                    height: 100,
                    marginTop: 100,
                    marginBottom: 50,
                    alignSelf: 'center',
                    }}
                    source={require('/buscape/src/Assets/form.png')}
                />

            
            </View>
            
            <View>
                <Formik
                    initialValues={{
                        nome:'',
                        email:'',
                        sexo:'',  
                        nascimento:'',
                        celular:'',
                        cpf:'',
                        senha:'',
                        confirmSenha:'',
                    }}
                    validationSchema={registerValidationSchema}
                    onSubmit={(values) => {
                        values.celular = "+55" + this.phoneField.getRawValue();
                        values.cpf = this.cpfField.getRawValue();
                        registerFirebase(values);
                    }}
                >

                    {(props) => (

                        <View style={styles.container}>
                            <TextInput style={styles.input}
                                placeholder="Nome"
                                autoCorrect={false}
                                onChangeText={props.handleChange('nome')}
                                value={props.values.nome}
                            />

                            <Text style={styles.error}>{ props.touched.nome && props.errors.nome }</Text>  

                            <TextInput style={styles.input}
                                placeholder="Email"
                                autoCorrect={false}
                                keyboardType="email-address"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />

                            <Text style={styles.error}>{ props.touched.email && props.errors.email }</Text>

                            <Picker style={styles.input} 
                                selectedValue={props.values.sexo}
                                mode = {'dropdown'}
                                itemStyle = {'textstyle'}
                                onValueChange={props.handleChange('sexo')}
                                value={props.values.sexo}
                            >
                                <Picker.Item label="Sexo" value='' />
                                <Picker.Item label="Masculino" value='masculino' />
                                <Picker.Item label="Feminino" value='feminino' />
                                <Picker.Item label="Outro" value='outro' />

                            </Picker>

                            <Text style={styles.error}>{ props.touched.sexo && props.errors.sexo }</Text>

                            <TextInputMask
                                style={styles.input}
                                placeholder="Data de nascimento"
                                keyboardType="phone-pad"
                                type={"custom"}
                                options={{
                                    mask: '99/99/9999'
                                }}
                                onChangeText={props.handleChange('nascimento')}
                                value={props.values.nascimento}
                            /> 

                            <Text style={styles.error}>{ props.touched.nascimento && props.errors.nascimento }</Text>

                            <TextInputMask
                                style={styles.input}
                                placeholder="Celular"
                                keyboardType="phone-pad"
                                type={"cel-phone"}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                onChangeText={props.handleChange('celular')}
                                value={props.values.celular}

                                ref={(ref) => this.phoneField = ref}

                            /> 

                            <Text style={styles.error}>{ props.touched.celular && props.errors.celular }</Text>

                            <TextInputMask
                                style={styles.input}
                                placeholder="CPF"
                                keyboardType="phone-pad"
                                type={"cpf"}
                                onChangeText={props.handleChange('cpf')}
                                value={props.values.cpf}

                                ref={(ref) => this.cpfField = ref}
                            /> 

                            <Text style={styles.error}>{ props.touched.cpf && props.errors.cpf }</Text>

                            <TextInput style={styles.input}
                                placeholder="Senha"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={props.handleChange('senha')}
                                value={props.values.senha}
                            />

                            <Text style={styles.error}>{ props.touched.senha && props.errors.senha }</Text>

                            <TextInput style={styles.input}
                                placeholder="Confirmar senha"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={props.handleChange('confirmSenha')}
                                value={props.values.confirmSenha}
                            />

                            <Text style={styles.error}>{ props.touched.confirmSenha && props.errors.confirmSenha }</Text>

                            <TouchableOpacity style={styles.btnSubmit} onPress={props.handleSubmit}>
                                <Text style={styles.SubmitText}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background:{
        backgroundColor: '#206164',
    },

    viewForm:{
        flex:1,
        width: '100%',
    },
     
    container:{
        flex:2,
        alignItems:'center',
        justifyContent: 'center',
        width: '100%',

        marginBottom: 100,
    },

    input:{
        backgroundColor: '#FFF',
        width: '80%',
        color: 'black',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
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

    error:{
        fontSize: 13, 
        color: 'red'
    }
})

