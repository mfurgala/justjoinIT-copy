import { CV, offersList } from "App/utils/mockData.js";
import { rest } from "msw";

const handlers = [
  rest.post("/devs", async (req, res, ctx) => {
    return res(ctx.text("4325325325235"));
  }),
  rest.post("/devs/signup", async (req, res, ctx) => {
    return res(ctx.text("4325325325235"));
  }),
  rest.get("/", async (req, res, ctx) => {
    return res(ctx.json(offersList));
  }),
  rest.get("/cv/get", async (req, res, ctx) => {
    return res(ctx.json(CV));
  }),
];

export { handlers };
