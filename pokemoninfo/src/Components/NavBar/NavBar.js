import './NavBar.css';
import { NavLink } from "react-router-dom";

const links = [
  { path: '/', text: 'About' },
  { path: 'nameInput', text: 'Pokémon Info'},
  { path: 'monoTypeTeamBuilder', text: 'Type Team Builder'},
];

function NavBar() {
  return (
    <div className="navBar">
      <ul className="navBarList">
        {links.map((link) => {
          return (
            <li  key={link.text}>
              {/* NavLink as opposed to "a href" to keep entire page from reloading 
              See: https://ibaslogic.com/routing-with-react-router/
              for more information*/}
              <NavLink className="navItem" to={link.path}>{link.text}</NavLink>
            </li>
          )
        })}
        <li>
          LINK TO PORTFOLIO
        </li>
      </ul>
    </div>
  )
};

export default NavBar;