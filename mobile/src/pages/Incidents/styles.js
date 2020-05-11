import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
      flex: 1,
      paddingHorizontal: 24, /*mesma coisa q paddin: 0 24*/
      paddingTop: Constants.statusBarHeight + 20, /*pega o tamanho da statusBar e aumenta 20px*/
    },

    header:{
      flexDirection: 'row', /*itens um ao lado do outro*/
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    headerText: {
      fontSize: 15,
      color: '#737380',
    },

    headerTextBold: {
      fontWeight: 'bold'
    },

    title: {
      fontSize: 30,
      marginBottom: 16,
      marginTop: 48,
      color: '#13131a',
      fontWeight: 'bold'
    },

    description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#737380'
    },

    incident: {
      padding: 24,
      borderRadius: 8, /*borda arredondada*/
      backgroundColor: '#FFF',
      marginBottom: 16, /*distanciar dos demais*/
    },

    incidentProperty: {
      fontSize: 14,
      color: '#41414d',
      fontWeight: 'bold'
    },

    incidentValue: {
      marginTop: 8,
      fontSize: 15,
      marginBottom: 24,
      color: '#737380'
    },

    detailsButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    detailsButtonText: {
      color: '#e02041',
      fontSize: 15,
      fontWeight: 'bold'
    },
});