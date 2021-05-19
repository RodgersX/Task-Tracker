import classes from "../App.module.css"
import Button from './Button'
import { useLocation } from 'react-router-dom'

// accessing props in de-structure format
const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            { location.pathname == '/' && 
                <Button
                color={showAdd ? 'red' : 'green' }
                text={ showAdd ? 'Close' : 'Add' }
                onClick={onAdd} />
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Track Tracer'
}

export default Header