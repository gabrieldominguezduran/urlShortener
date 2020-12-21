const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../src/server");
const connect = require("../../src/db/index");

describe("POST /getUrl", () => {
  before((done) => {
    connect
      .connect()
      .then(() => done())
      .catch((err) => done(err));
  });
  it("OK, create a new url entry", (done) => {
    request(app)
      .post("/getUrl")
      .send({
        url: "https://www.youtube.com/watch?v=Z57566JBaZQ",
        code: "VfaN3C",
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("url");
        expect(body).to.contain.property("code");
        expect(body).to.contain.property("createdAt");
        expect(body).to.contain.property("updatedAt");
      });
  });
});
