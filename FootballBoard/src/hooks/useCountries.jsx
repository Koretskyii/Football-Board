import { useState, useEffect } from "react";
import { CountriesList } from "../constants/countriesList";

export function useCountries(){
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
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

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);
                const countries = await response.json();
                console.log(countries.response);
                const filteredCountries = countries.response.filter(country => CountriesList.has(country.name))
                console.log(filteredCountries)

                setCountries(filteredCountries);
            } catch (error) {
                setError('Error! Failed to fetch countries')
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, loading, error }
}
