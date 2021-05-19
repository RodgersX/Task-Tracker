import classes from '../App.module.css'

const Button = ({ color, text, onClick }) => {

    return (
        <button
        style={{ backgroundColor: color }} 
        className={classes.btn}
        onClick={onClick}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Button
