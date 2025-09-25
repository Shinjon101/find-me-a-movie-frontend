import { delay, http, HttpResponse } from "msw";
import { server } from "./mocks/server";

const url = import.meta.env.TEST_DEPLOYED_URL;

export const simulateDelay = (endpoint: string) => {
  const route = url + endpoint;
  server.use(
    http.get(route, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
};
export const simulateError = (endpoint: string) => {
  const route = url + endpoint;
  server.use(http.get(route, () => HttpResponse.error()));
};
