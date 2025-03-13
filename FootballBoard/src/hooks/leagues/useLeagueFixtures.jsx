import { useEffect, useState } from "react";

export function useLeagueFixtures(leagueID) { 
        const [fixtures, setFixtures] = useState(null)
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagueFixtures = async () => {
            const roundUrl = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/fixtures/rounds?league=${leagueID}&season=${new Date().getFullYear() - 1}&current=${true}`;

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
            try {
                const roundResponse = await fetch(roundUrl, options);
                const round = await roundResponse.json().then(data => {
                    return data.response[0]
                });
                console.log(round);
                
                const fixturesUrl = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/fixtures?league=${leagueID}&season=${new Date().getFullYear() - 1}&round=${round}`;
                const fixturesResponse = await fetch(fixturesUrl, options)
                const fixtures = await fixturesResponse.json().then(data => {
                    return data.response
                });
                console.log(fixtures)
                setFixtures(fixtures);

            } catch (error) {
                setError('Error! Failed to fetch countries')
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if(leagueID)
            fetchLeagueFixtures()
    }, [leagueID])

    return {fixtures, loading, error}
}