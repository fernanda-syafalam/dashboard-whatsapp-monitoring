export default function GlobalError({ error }: { error: Error }) {
  return (
    <div>
      <h1>Oops! Something went wrong 😢</h1>
      <p>Try refreshing the page or contact support.</p>
    </div>
  );
}
