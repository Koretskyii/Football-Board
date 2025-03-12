import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import classes from './NavList.module.css'

export default function NavList() {
    return (
        <List sx={{ display: 'flex', width: '100%' }}>
            <ListItem sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #0A5EB0' }}>
                <NavLink to={'/home'} className={classes.Link}>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Typography variant='h4'>Scout</Typography>
                        </ListItemText>
                    </ListItemButton>
                </NavLink>
            </ListItem>
            <ListItem sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #0A5EB0' }}>
                <NavLink to={'/game'} className={classes.Link}>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Typography variant='h4'>Games Center</Typography>
                        </ListItemText>
                    </ListItemButton>
                </NavLink>
            </ListItem>
        </List>
    )
}