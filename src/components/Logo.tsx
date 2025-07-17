import classes from './Logo.module.css';
import logo from '../assets/yplan-logo.png';

export function Logo() {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo" height={50} />
    </div>
  );
}
