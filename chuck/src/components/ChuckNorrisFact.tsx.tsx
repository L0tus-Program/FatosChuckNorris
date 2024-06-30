import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHUCK_FACT = gql`
  query {
    chuckFact
  }
`;

const ChuckNorrisFact: React.FC = () => {
    const { loading, error, data } = useQuery(GET_CHUCK_FACT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <p className="text-lg">{data.chuckFact}</p>
        </div>
    );
};

export default ChuckNorrisFact;
