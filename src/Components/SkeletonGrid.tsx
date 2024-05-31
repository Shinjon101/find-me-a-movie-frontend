import React from "react";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const SkeletonGrid = () => {
  return (
    <>
      {skeletons.map((skeleton) => (
        <MovieCardContainer key={skeleton}>
          <MovieCardSkeleton key={skeleton} />
        </MovieCardContainer>
      ))}
    </>
  );
};

export default SkeletonGrid;
