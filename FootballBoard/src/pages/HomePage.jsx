import { useEffect, useState } from 'react';

export function HomePage() {
    // const [leagues, setLeagues] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const url = `${import.meta.env.VITE_BASE_SPORTS_API_URL}/v3/countries`;
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
                const response = await fetch(url, options);
                const data = await response.json();
                console.log(data.response);
                setLeagues(data.response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log("Updated leagues state:", leagues && leagues[0].league);
    // }, [leagues]);

    return (
        <>
            <h1>Leagues to choose</h1>
            {/* <ul>
                {leagues && leagues.map((league) => (
                    <li key={league.league.id}>{league.league.name}</li>
                ))}
            </ul> */}
        </>
    );
}