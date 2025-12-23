import { handlers } from "App/utils/server-handler";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(...handlers);
export { server, rest };
