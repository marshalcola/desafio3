import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  // inicializa o estado com o array vazio 
  const [repositories, setRepositories] = useState([]);

  useEffect (() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    }); 
  }, []);


  async function handleAddRepository() {
    // pegar o resultado da API const response
    const response = await api.post('repositories', {
      title: 'Desafio Marshal',
      url: 'https://github.com',
      techs: [ 'ReactJS', 'Node.JS']
    })
    // depois que adiciona os dados dentro do array, necessita mostrar em tela
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
     {repositories.map(repository => (
      <li key={repository.id}>
        
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
     ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
