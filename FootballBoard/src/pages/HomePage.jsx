import { Link, List, ListItem } from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import useLeagues from '../hooks/useLeagues.jsx';
import { useState } from 'react';
import { useStandings } from '../hooks/useStandings.jsx';
import { redirect } from 'react-router';

export function HomePage() {
    const { countries, error, loading } = useCountries()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedLeague, setSelectedLeague] = useState(null)

    const { leagues, loading: leaguesLoading, error: leaguesError } = useLeagues(selectedCountry)
    const { standings, loading: standingsLoading, error: standingsError } = useStandings(selectedLeague)

    return (
        <>
            {<List sx={{ display: 'flex', }}>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {countries && countries.map((country) => (
                    <ListItem key={country.code}>
                        <Link href='#' color='#3f51b5' sx={{ textDecoration: 'none' }} onClick={() => setSelectedCountry(country.name)}>{country.name}</Link>
                    </ListItem>
                ))}
            </List>}
            <List>
                {leaguesLoading && <p>Loading...</p>}
                {leaguesError && <p>{leaguesError}</p>}
                {leagues && leagues.map((league) => (
                    <ListItem key={league.league.id}>
                        <Link key={league.league.id} href="#" color='#3f51b5' sx={{ textDecoration: 'none' }} onClick={() => setSelectedLeague(league.league.id)}>
                            <img src={league.league.logo} alt={league.league.name} width={20}/> {league.league.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
            <List sx={{display: 'flex', flexDirection: 'column'}}>
                {standingsLoading && <p>Loading...</p>}
                {standingsError && <p>{standingsError}</p>}
                <ListItem>
                </ListItem>
                {standings && standings.map((el) => (
                    <ListItem  key={el.team.id}>
                        <Link 
                        sx={{display: 'flex', flexDirection: 'row', justifyContent: 'left', gap: '2%', width: '100%', textDecoration: 'none'}}
                        bgcolor={el.rank % 2 != 0 ? '#F7F7F7' : 'inherit'} 
                        href="/teamFixtures?team=${}" color='#3f51b5'>
                        <span>{el.rank}. </span> 
                        <div><img src={el.team.logo} width={'20px'}></img>  {el.team.name}</div>
                        <span>{el.points} pts</span> 
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    );
}