import { Container, Typography } from '@mui/material'
import NavList from './NavList/NavList'

export function Header() {
    return (
        <>
            <Container maxWidth={'xl'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h1' fontSize={'2rem'}
                    sx={{
                        textAlign: 'center',
                        width: 'max-content',
                        color: '#0A5EB0',
                        borderBottom: '1px solid #0A5EB0',
                        borderBottomLeftRadius: '20%',
                        borderBottomRightRadius: '20%'
                    }}>
                    Football Board
                </Typography>
                <NavList />
            </Container>
        </>
    )
}