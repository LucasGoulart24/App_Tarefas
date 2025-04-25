import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icone from '@expo/vector-icons/Feather';

export default function App() {
  const[tarefas, setTarefas] = useState([]);
  const[novaTarefa, setNovaTarefa] = useState('');

  // Função de adicionar uma tarefas
  const adicionarTarefa = () => {
    if(novaTarefa.trim() === '')
      return;
    const nova = {
      id: Date.now().toString(),
      texto: novaTarefa
    }
    setTarefas([...tarefas, nova]);
    setNovaTarefa('');
  }

  // Função de excluir a tarefa
  const excluirTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>App de Tarefas</Text>
      <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row', gap: 5 }}>
        <TextInput 
          style={styles.input} 
          placeholder='Adicione uma tarefa'
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
          <Text style={{ fontSize: 17, color: "#000" }}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        style={{ width: 380 }}
        data={tarefas}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> (
          <View style={styles.tarefa}>
            <Text style={{ fontSize: 20 }}>{item.texto}</Text>
            <TouchableOpacity style={styles.botaoExcluir} onPress={()=> excluirTarefa(item.id)}>
              <Icone name='trash-2' size={20} color={"#FFF"}/>
              <Text style={{ fontSize: 16, color: "#FFF" }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 100
  },
  input: {
    width: 270,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#EEE',
    borderWidth: 1
  },
  botao: {
    width: 100,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  tarefa: {
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexDirection: 'row',
    margin: 5
  },
  botaoExcluir: {
    width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#EA0000',
    gap: 5
  }
});
