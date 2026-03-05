const HomeInfoPanel = () => {
  return (
    <div className="mt-5 rounded-md border p-6 text-sm text-muted-foreground">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Discover what to watch
      </h3>

      <p className="mb-4">
        Up Next helps you find movies currently playing in theaters, shows
        available on streaming platforms, and podcasts worth listening to.
      </p>

      <p className="mb-4">
        Use the categories to explore what’s available right now and find
        something great to watch or listen to.
      </p>

      <ul className="space-y-1">
        <li>🎬 Movies in theaters</li>
        <li>📺 Movies & TV on streaming</li>
        <li>
          🎧 Podcasts are coming soon and is currently under construction.
        </li>
      </ul>
    </div>
  );
};

export default HomeInfoPanel;
