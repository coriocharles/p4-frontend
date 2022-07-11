import react from 'react'
import { Link } from 'react-router-dom'
function Homepage() {
    return(
        <>
        Welcome!<br></br>
            <Link to={`/artist/1`}>LINK TO GROUPER</Link>
        </>
    )
}

export default Homepage