export default function SetQuery({ query, setQuery }) {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search..."
      />
    </div>
  );
}
