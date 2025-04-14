

export interface GetLeaderboardDTO {
    groupId: string;
    range: "weekly" | "monthly" | "yearly" | "all";
}