import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native'; 
import Intl from 'intl';
/*
touchableOpacity, tudo que for tocavel ele diminui a opacidade um pouco
flatlist: toda listagem fica dentro da flat lista, "barra de rolagem"
*/
/*
data(array de dados que monta a lista), render(responsavel por renderizar os itens)
keyextractor: recebe os incidents, retorna a informação unica em cada um dos incidents
howsVerticalScrollIndicator: não mostra a barra de rolagem
*/
/*variavel item: incident, faz com que a variavel incident contenha os itens buscados pela api*/
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Detail', {incident});
  }

  /*busca os dados dentro da api incidents, se load for true então ele impede que se uma requisição estiver sendo feita impede a outra de ocorrer, se o total de incidentes for igual ao tamanho de incidentes ele tambem não busca mais*/
  /*setIncidents: cria um objeto que copia os valores que ja estao dentro de incidents e os valores dentro do response.data, anexa dois vetores basicamente dentro de um unico*/
  /*onEndReached: função disparada automatica ao fim da lista, onEndReachedThreshold: quantos 5 do fim da lista o usuario precisa estar apra carregar a lista*/
  async function loadIncidents(){
    if(loading){
      return;
    }
    if(total>0 && incidents.length == total){
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: {page}
    });
    setIncidents([... incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)} //busca os dados de acordo com o id
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}.format(incident.value))}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}