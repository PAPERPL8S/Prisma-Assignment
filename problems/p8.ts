import { maxBy, minBy, pipe } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const groupedStarRatings = await prisma.starRating
    .groupBy({
      by: ["userId"],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: "asc",
        },
      },
      take: 1,
    })
    .then((starRatingAggregated) => starRatingAggregated[0].userId);

  return groupedStarRatings;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const usersWithAvgScore = await prisma.starRating
    .groupBy({
      by: ["userId"],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: "desc",
        },
      },
      take: 1,
    })
    .then((starRatingAggregated) => starRatingAggregated[0].userId);

  return usersWithAvgScore;
};
