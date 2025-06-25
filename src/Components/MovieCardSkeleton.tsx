import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card
      as="article"
      role="article"
      aria-label="Loading movie information"
      aria-busy="true"
      borderRadius="lg"
      overflow="hidden"
      width="auto"
      maxW="full"
      aspectRatio={2 / 3}
    >
      <Skeleton
        height="70%"
        aria-label="Loading movie poster"
        startColor="gray.200"
        endColor="gray.300"
        fadeDuration={0.8}
      />
      <CardBody
        as="footer"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        height="30%"
        padding={2}
        aria-label="Loading movie details"
      >
        <SkeletonText
          noOfLines={2}
          spacing="2"
          skeletonHeight="2"
          aria-label="Loading movie title"
          startColor="gray.200"
          endColor="gray.300"
          fadeDuration={0.8}
        />
        <SkeletonText
          mt={2}
          noOfLines={1}
          spacing="2"
          skeletonHeight="1.5"
          aria-label="Loading movie genres and release date"
          startColor="gray.200"
          endColor="gray.300"
          fadeDuration={0.8}
        />
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
