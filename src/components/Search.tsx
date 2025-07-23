import classes from "./Search.module.css";
type SearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export function Search({ searchTerm, onSearchChange }: SearchProps) {
  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Cerca..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
