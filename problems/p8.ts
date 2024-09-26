import { maxBy, minBy, pipe } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const usersWithAvgScore = await prisma.user.findMany({
    include: {
      starRatings: true,
    },
  });

  const grumpiestCritic = pipe(
    usersWithAvgScore,
    minBy((user) =>
      user.starRatings.length
        ? user.starRatings.reduce((sum, rating) => sum + rating.score, 0) /
          user.starRatings.length
        : Infinity,
    ),
  );
  return grumpiestCritic?.id || null;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const usersWithAvgScore = await prisma.user.findMany({
    include: {
      starRatings: true,
    },
  });

  const nicestCritic = pipe(
    usersWithAvgScore,
    maxBy((user) =>
      user.starRatings.length
        ? user.starRatings.reduce((sum, rating) => sum + rating.score, 0) /
          user.starRatings.length
        : -Infinity,
    ),
  );

  return nicestCritic?.id || null;
};
