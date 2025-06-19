import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card>
      <Skeleton />
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        width="auto"
        maxW="full"
        aspectRatio={2 / 3}
      >
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
