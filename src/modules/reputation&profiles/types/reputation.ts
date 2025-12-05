export interface Reputation{
    wightedScores: Record<string, number>;
    average: number;
    totalRatings: number;
}