const app = require("../index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

describe("Pruebas del servidor", () => {
  it(" respuesta exitosa", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Hola, bienvenido al servidor");
        done();
      });
  });



  // Cerrar el servidor después de las pruebas
  after((done) => {
    app.close(() => {
      console.log("Servidor detenido después de las pruebas");
      done();
    });
  });
});
