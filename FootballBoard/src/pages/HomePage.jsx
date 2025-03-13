import { Container, Link, List, ListItem, Typography } from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import useLeagues from '../hooks/useLeagues.jsx';
import { useState } from 'react';
import { useStandings } from '../hooks/leagues/useStandings.jsx';
import { redirect } from 'react-router';
import { useLeagueFixtures } from '../hooks/leagues/useLeagueFixtures.jsx';
import { getFormattedDate } from '../utils/getFormattedDate.js';

export function HomePage() {
    const { countries, error, loading } = useCountries()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedLeague, setSelectedLeague] = useState(null)

    const { leagues, loading: leaguesLoading, error: leaguesError } = useLeagues(selectedCountry)
    const { standings, loading: standingsLoading, error: standingsError } = useStandings(selectedLeague)
    const { fixtures, loading: fixturesLoading, error: fixturesError } = useLeagueFixtures(selectedLeague)

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
                            <img src={league.league.logo} alt={league.league.name} width={20} /> {league.league.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Container sx={{ display: 'flex', flexDirection: 'row' }}>
                <List sx={{ display: 'flex', flexDirection: 'column', width: '30vw' }}>
                    {standingsLoading && <p>Loading...</p>}
                    {standingsError && <p>{standingsError}</p>}
                    <ListItem>
                    </ListItem>
                    {standings && standings.map((el) => (
                        <ListItem key={el.team.id}>
                            <Link
                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', gap: '2%', width: '50vw', textDecoration: 'none' }}
                                bgcolor={el.rank % 2 != 0 ? '#F7F7F7' : 'inherit'}
                                href={`teamFixtures/${el.team.id}`} color='#3f51b5'>
                                <span>{el.rank}. </span>
                                <div><img src={el.team.logo} width={'20px'}></img>  {el.team.name}</div>
                                <span>{el.points} pts</span>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <List sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '70vw', margin: 0 }}>  
                    {fixturesLoading && <p>Loading...</p>}
                    {fixturesError && <p>{fixturesError}</p>}
                    <ListItem sx={{gridColumn: 'span 2', justifyContent: 'center'}}>
                        <Typography>Current round</Typography>
                    </ListItem>
                    {fixtures && fixtures.map(fixture => (
                        <ListItem key={fixture.fixture.id} sx={{ display: "flex", flexDirection: 'column', alignItems: 'start' }}>
                            <div>{getFormattedDate(fixture.fixture.date)}
                            </div>
                            <br />
                            <div>
                                <img src={fixture.teams.home.logo} alt="" width={'20px'} />
                                <span>{fixture.teams.home.name} {fixture.goals.home} - {fixture.goals.away} {fixture.teams.away.name}</span>
                                <img src={fixture.teams.away.logo} alt="" width={'20px'} />
                            </div>
                            <br />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
}