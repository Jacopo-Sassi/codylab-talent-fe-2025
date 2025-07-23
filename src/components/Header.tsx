import { Actions } from './Actions';
import classes from './Header.module.css';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Search } from './Search';

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className={classes.header}>
      <Logo />
      <Navigation />
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <Actions />
    </header>
  );
}
