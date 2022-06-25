import { AppBar, Switch, Toolbar, Typography } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Theme switch' } };
interface Props{
  darkMode:boolean;
  handleThemeChange:()=>void;
}
function Header({darkMode,handleThemeChange}:Props) {
  return (
    <>
    <AppBar position='static' sx={{marginBottom:4}}>
        <Toolbar>
            <Typography variant='h6'>
                RE-STORE
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header