import { useEffect, useState } from "react";

export default function useLeagues(countryName) {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/leagues?country=${countryName}`;
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

                const response = await fetch(url, options);
                const leagues = await response.json();
                console.log(leagues)
                const filteredLeagues = leagues.response.slice(0, 5);   
                setLeagues(filteredLeagues || []);
            } catch (error) {
                setError("Error! Failed to fetch leagues");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (countryName) { 
            fetchLeagues(); 
        }
    }, [countryName]); 

    return { leagues, loading, error };
}
