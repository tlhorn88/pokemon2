import { NavLink } from "react-router-dom";

const links = [
  { path: '/', text: 'Title' },
  { path: 'nameInput', text: 'NameInput'},
  { path: 'monoTypeTeamBuilder', text: 'MonoTypeTeamBuilder'},
];

function NavBar() {
  return (
    <div className="navBar">
      <ul>
        {links.map((link) => {
          return (
            <li key={link.text}>
              {/* NavLink as opposed to "a href" to keep entire page from reloading 
              See: https://ibaslogic.com/routing-with-react-router/
              for more information*/}
              <NavLink to={link.path}>{link.text}</NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default NavBar;