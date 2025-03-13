import { useEffect, useState } from "react";

export function useFixtures(teamID) {
    const [fixtures, setFixtures] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchFixtures = async () => {
            // TODO: add logic for defining current season
            const url = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/fixtures?season=2024&team=${teamID}`;
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
                const fixtures = await response.json().then(data => {
                    return data.response
                });

                console.log(fixtures);
                setFixtures(fixtures);

            } catch (error) {
                setError('Error! Failed to fetch countries')
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (teamID) {
            fetchFixtures();
        }
        
    }, [teamID])

    return {fixtures, loading, error}
}