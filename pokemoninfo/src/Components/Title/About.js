import './About.css';

function About() {
  return (
    <div className='aboutContainer'>
      <h1>About this App</h1>
      <ul>
        <li className="aboutItem">React</li>
        <li className="aboutItem">React Router</li>
        <li className="aboutItem">Axios</li>
        <li className="aboutItem">useState and useEffect</li>
      </ul>
      <p>This web application allows users to generate a team of Pokémon based on their chosen type. It's built using React and the React Router library for navigation.</p>

      <p>An API call to PokeAPI is made using Axios to populate a list of Pokemon types and their associated URLs.  Once a user selects a type, another API call is made to retrieve a list of Pokemon associated with that type.</p>
      <p>The app then randomly selects three Pokemon from that list and displays them on the page with associated information.  A check is made so that each of the three Pokemon displayed have a unique secondary type.</p>
    </div>
  )
}

export default About;