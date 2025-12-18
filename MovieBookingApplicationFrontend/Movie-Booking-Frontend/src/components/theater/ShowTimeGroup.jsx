import ShowTimeCard from "../ShowTimeCard";

export default function ShowTimeGroup({ shows, onSelectShow }) {
  if (!shows || shows.length === 0) {
    return (
      <p className="text-sm text-gray-400 mt-2">
        No shows available for this theater.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {shows.map((show) => (
        <ShowTimeCard
          key={show.showId}
          time={show.showTime}
          onSelect={() => onSelectShow(show)}
        />
      ))}
    </div>
  );
}
