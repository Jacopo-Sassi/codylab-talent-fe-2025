 import { Actions } from './Actions';
import classes from './Header.module.css';
 import { Logo } from './Logo';
 import { Navigation } from './Navigation';
 import { Search } from './Search';

 export function Header() {
  return (
    <header className={classes.header}>
      <Logo />
      <Navigation />
      <Search />
      <Actions />
    </header>
  );
}