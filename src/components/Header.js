import classes from "../App.module.css"
import Button from './Button'

// accessing props in de-structure format
const Header = ({ title, onAdd, showAdd }) => {
    
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            <Button
            color={showAdd ? 'red' : 'green' }
            text={ showAdd ? 'Close' : 'Add' }
            onClick={onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Track Tracer'
}

export default Header