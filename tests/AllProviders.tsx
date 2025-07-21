import { ReactNode } from "react";
import theme from "../src/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import router from "../src/routes";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
  route?: string;
}
export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0 } },
});
export const AllProviders = ({ children, route = "/" }: Props) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
