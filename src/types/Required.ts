export interface Genre {
  name: string;
}

export interface ReplayGain {
  trackPeak: number;
  albumPeak: number;
}

export interface PartialDate {
  year?: number;
  month?: number;
  day?: number;
}
