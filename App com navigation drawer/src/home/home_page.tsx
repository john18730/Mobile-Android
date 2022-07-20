import * as React from 'react'
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import ContatoServico from '../servico/contato_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Contato } from '../modelo/Contato'
import * as Speech from 'expo-speech';


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllContato() 
    }
    
    state = {
    contato:Contato,
    lista_array_dados_contato: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioJoao:null,
    formularioEmail:null,
    formularioatributoIdade:null
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarContato();
    this.findAllContato ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_contato !== this.state.lista_array_dados_contato) {
    this.findAllContato ();
    }
    }

    findAllContato=()=> {
        ContatoServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_contato: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteContato=(id)=> {
    this.findContatoById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        ContatoServico.deleteById(id)
    Alert.alert("Contato excluido com sucesso: ")
    }
    }

    toSpeak(formularioJoao,formularioatributoIdade){
        const speech = 'O contato ' + formularioJoao +' que tem ' + formularioatributoIdade + ' anos foi inserido com sucesso!'
        Speech.speak(speech, {
            language: 'pt-BR',
            rate: 0.8


        })
    }
    
    atualizaContato=(item0, item1, item2, item3)=> {
    let contato=new Contato()// cria objeto memória
    contato.id=item0 // seta o atributo atributoArtur do objeto 
    contato.atributoJoao=item1 // seta o atributo atributoArtur do objeto 
    contato.email=item2 // seta o atributo atributoArtur do objeto 
    contato.atributoIdade =item3
    
    ContatoServico.updateByObjeto(contato).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Nome não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertContato=(item1, item2, item3)=> {
    let contato=new Contato()// cria objeto memória
    contato.atributoJoao=item1 // seta o atributo nome do objeto 
    contato.email=item2 // seta o atributo nome do objeto 
    contato.atributoIdade=item3
    
    // cria um id no banco para persistir o objeto
    const insertId=ContatoServico.addData(contato);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo contato")
    } else{
        Alert.alert("Contato adicionado com sucesso!")
    }
    this.setState({
        formularioJoao:'',
        formularioEmail:'',
        formularioatributoIdade:''
    })
    this.toSpeak(item1,item3);
    return contato
    }
    
    instanciarContato=()=>{
    let contato:Contato=new Contato()// cria objeto memória
    return contato
    }
    
    
    
    findContatoById=(id)=> {
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaContato=(id)=> { 
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let contatopesquisa:Contato=new Contato()// cria objeto memória
    const contatoretorno=response._array.map((item,key)=>{
    contatopesquisa.id=item.id;
    contatopesquisa.atributoJoao=item.atributoArtur;
    contatopesquisa.email=item.email;
    contatopesquisa.atributoIdade=item.atributoIdade;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    contato:contatopesquisa,
    formularioId: contatopesquisa.id,
    formularioJoao:contatopesquisa.atributoJoao,
    formularioEmail:contatopesquisa.email,
    formularioatributoIdade:contatopesquisa.atributoIdade
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("Nome Não foi possível atualizar")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {contato,lista_array_dados_contato,value,Id_pesquisar,formularioId,formularioJoao: formularioJoao,formularioEmail,formularioatributoIdade} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const contatoList = lista_array_dados_contato.map((item, key) => {
            return (
                <> 
                    <Text >id:{item.id} atributoArtur:{item.atributoArtur} email:{item.email} atributoIdade:{item.atributoIdade}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Contatos</Text>

                <TextInput
                    placeholder="Digite o id Pesquisar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="Digite o nome do novo contato"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioJoao => { this.setState({ formularioArtur: formularioJoao }) }}
                    value={formularioJoao}
                />

                    <TextInput
                    placeholder="Digite o email "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioEmail => { this.setState({ formularioEmail: formularioEmail }) }}
                    value={formularioEmail}
                    
                />

                    <TextInput
                    placeholder="Digite a idade "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioatributoIdade => { this.setState({ formularioatributoIdade: formularioatributoIdade}) }}
                    value={formularioatributoIdade}
                    
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioJoao == null  ? Alert.alert("O campo de nome não deve ser vazio") :this.insertContato(formularioJoao, formularioEmail, formularioatributoIdade)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? Alert.alert("Não há Objeto para atualizar faça uma pesquisa") :this.atualizaContato(formularioId,formularioJoao, formularioEmail, formularioatributoIdade)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não deve ser vazio") : this.localizaContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não deve ser vazio") : this.deleteContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {contatoList}
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});