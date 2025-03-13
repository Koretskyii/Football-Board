import { useParams } from "react-router"
import { useFixtures } from "../hooks/teams/useFixtures";
import { List, ListItem } from "@mui/material";
import { getFormattedDate } from "../utils/getFormattedDate";

export function TeamFixtures() {
    const { teamId } = useParams();
    const {fixtures, loading, error} = useFixtures(teamId)
    return (
        <> Team fixtures {teamId}
        <List>
            {loading && <p>Loading...</p>}
            {error && {error}}
            {fixtures && fixtures.map(fixture => (
                <ListItem key={fixture.fixture.id} sx={{display: "flex", flexDirection: 'column', alignItems: 'start'}}>
                    <div>{getFormattedDate(fixture.fixture.date)}
                    </div>
                    <br />
                    <div>
                        <img src={fixture.teams.home.logo} alt="" width={'20px'}/>
                        <span>{fixture.teams.home.name} {fixture.goals.home} - {fixture.goals.away} {fixture.teams.away.name}</span> 
                        <img src={fixture.teams.away.logo} alt="" width={'20px'}/>
                    </div>
                    <br />
                </ListItem>
            ))}
        </List>
        </>
        
    )
}