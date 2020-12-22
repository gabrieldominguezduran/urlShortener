const request = require("supertest");
const app = require("../src/server");
const { nanoid } = require("nanoid");
const code = nanoid(6);
describe("App", () => {
  it("Render index page", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect(/Url shortener/, done);
  });
  it("Store url and code given", (done) => {
    request(app)
      .post("/getUrl")
      .send({ url: "https://www.youtube.com/", code: code })
      .expect(302, done);
  });
  it("Render stats page", (done) => {
    request(app).get(`/${code}/stats`).expect(200).expect(/Stats/, done);
  });
});
