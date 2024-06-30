import React, { useState } from 'react';
import './App.css';

interface ChuckNorrisFact {
  chuckFact: string;
  icon_url: string;
}

function App() {
  const [fact, setFact] = useState<ChuckNorrisFact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              chuckFact {
                chuckFact
                icon_url
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Chuck Norris fact');
      }

      const responseData = await response.json();
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }

      setFact(responseData.data.chuckFact);
      setError(null); // Limpa qualquer erro anterior
    } catch (error) {
      console.error('Error fetching the fact:', error);
      setError(error.message || 'Failed to fetch Chuck Norris fact');
      setFact(null); // Limpa o estado do fato em caso de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white p-4">
      <button
        onClick={fetchFact}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Ver Fato Aleatório
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {fact && (
        <div className="text-center">
          {fact.icon_url && <img src={fact.icon_url} alt="Chuck Norris" className="w-20 h-20 mx-auto rounded-full" />}
          <p className="mt-4">{fact.chuckFact}</p>
        </div>
      )}
      {!loading && !fact && !error && <p>Clique no botão para ver um fato aleatório!</p>}
    </div>
  );
}

export default App;
