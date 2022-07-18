import react from 'react'
import { Link } from 'react-router-dom'
function Homepage() {
    return(
        <>
        Welcome!<br></br>
            <Link to={`/artist/Grouper`}>LINK TO GROUPER</Link><br></br>
            <Link to={`/genres`}>Genres</Link><br></br>

            <Link to={`/artists`}>Artists</Link>
        </>
    )
}

export default Homepage