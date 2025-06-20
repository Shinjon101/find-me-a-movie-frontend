import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const MovieDetailSkeleton = () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Skeleton height="40px" width="60%" borderRadius="lg" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />

          <SimpleGrid columns={2} spacing={4} mt={8}>
            {[...Array(4)].map((_, i) => (
              <Box key={i}>
                <Skeleton height="20px" width="40%" mb={2} />
                <Skeleton height="20px" width="80%" />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Skeleton
            width="342px"
            height="192px"
            maxW={{ base: "100%", md: "600px" }}
            borderRadius={20}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default MovieDetailSkeleton;
