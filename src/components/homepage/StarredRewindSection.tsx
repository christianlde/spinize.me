import { useStarred } from "../../hooks/useStarred";
import type { Song } from "../../types/Song";
import DataSection from "../DataSection";

export default function StarredRewindSection() {
  const { starred } = useStarred();
  const starredRewindSongs = starred?.song
    ?.sort((a: Song & { starredAt?: number }, b: Song & { starredAt?: number }) => {
      return (a.starredAt ?? 0) - (b.starredAt ?? 0); // oldest first
    })
    ?.slice(0, 20); // only the first 20 oldest

  return (
    <DataSection
      type="starred rewind"
      starred={starred}
      data={starredRewindSongs || []}
      viewAll={false}
    />
  );
}
