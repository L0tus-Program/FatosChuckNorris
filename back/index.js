const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');

const app = express();
const port = 4000;

app.use(cors());

const schema = buildSchema(`
  type ChuckNorrisFact {
    chuckFact: String
    icon_url: String
  }

  type Query {
    chuckFact: ChuckNorrisFact
  }
`);

const root = {
  chuckFact: async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      return {
        chuckFact: response.data.value,
        icon_url: response.data.icon_url // Inclui a URL da imagem na resposta
      };
    } catch (error) {
      console.error('Error fetching Chuck Norris fact:', error);
      throw new Error('Failed to fetch Chuck Norris fact');
    }
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
