import { useState, useEffect } from "react";

export function useStandings(leagueID){
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            const url = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/standings?league=${leagueID}&season=${2024}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': `${import.meta.env.VITE_BASE_SPORTS_API_KEY}`,
                    'x-rapidapi-host': `${import.meta.env.VITE_BASE_SPORTS_API_HOST}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-rapidapi-ua': 'RapidAPI-Playground'
                }
            };

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);
                const standings = await response.json().then(data => {
                    return data.response[0].league.standings[0] 
                });
                console.log(standings[0].team);
                setStandings(standings);
            } catch (error) {
                setError('Error! Failed to fetch standings')
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, [leagueID]);

    return { standings, loading, error }
}
