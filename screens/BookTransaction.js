import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class BookTransaction extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            buttonState:'normal',
            scannedBookID:'',
            scannedStudentID:'',
        }
    }

    getCameraPermission=async({ID})=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:ID,
            scanned:false,
        })

    }

    handleBarCodeScanned=async=({type, data})=>{      
        const {buttonState} = this.state
        if(buttonState==='bookID'){
            this.setState({
                scannedBookID:data,
                scanned:true,
                buttonState:'normal'
             })
        }
        else if(buttonState==='studentID'){
            this.setState({
                scannedStudentID:data,
                scanned:true,
                buttonState:'normal'
             })
        }   
    }

    render(){
        
        if(this.state.buttonState==='normal'){
            return(
                <View style={styles.containter}>
                    <Text style={styles.title}>Book Transaction</Text>

                    <Image
                        source={require('../assets/booklogo.jpg')}
                        style={styles.logo}
                    />
                    <View style={styles.idContainer}>
                    <TextInput
                        style={styles.ID}
                        placeholder='Book ID'
                        value={this.state.scannedBookID}
                    />
                    <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={()=>{this.getCameraPermission('bookID')}}
                    ><Text style={styles.searchText}>SCAN</Text></TouchableOpacity>
                    </View>
                    <View style={styles.idContainer}>
                    <TextInput
                        style={styles.ID}
                        placeholder='Student ID'
                        value={this.state.scannedStudentID}
                    />
                    <TouchableOpacity
                    style={styles.searchButton}
                    onPress={()=>{this.getCameraPermission('studentID')}}
                    ><Text style={styles.searchText}>SCAN</Text></TouchableOpacity>
                    </View>
                </View>
            );
        }
        else if(this.state.buttonState==='clicked'&&this.state.hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        
    }
}

const styles = StyleSheet.create({
    containter:{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title:{
        alignSelf:'center',
        fontSize: 60,
    },
    idContainer:{
        flexDirection:'row',
        margin:20,
    },
    button:{
        backgroundColor:'red',
        padding:20,
    },
    buttonText:{
        fontSize:30,
        textAlign:'center'
    },
    ID:{
        width:250,
        height:60,
        alignSelf:'center',
        borderWidth:2,
        fontSize:25,
    },
    searchButton:{
        backgroundColor:'lightblue',
        width: 70,
        borderWidth:1,
    },
    searchText:{
        textAlign:'center',
        marginTop:15,
        fontSize:20
    },
    logo:{
        width:150,
        height:150,
        alignSelf:'center'
    }
})