import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  const moviesWithAverageScoreOverN = movies.filter((movie) => {
    const averageScore =
      movie.starRatings.reduce((sum, rating) => sum + rating.score, 0) /
      movie.starRatings.length;
    return averageScore > n;
  });

  return moviesWithAverageScoreOverN.map((movie) => ({
    id: movie.id,
    title: movie.title,
    parentalRating: movie.parentalRating,
    releaseYear: movie.releaseYear,
  }));
};
