const express = require("express");
const { spawn } = require("child_process");
var cors = require("cors");
const app = express();
const port = 2554;

app.use(express.json());
app.use(cors());

app.get("/toppings", (req, res) => {
  // Get all toppings
  var toppings;
  const toppingsQuery = spawn("python3", ["./ontology/getToppings.py"]);
  toppingsQuery.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    toppings = data.toString();
  });
  toppingsQuery.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  toppingsQuery.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);

    let payload = [];
    if (!toppings) {
      return res.json({ success: true, payload: payload });
    }

    toppings = toppings.split(/\r?\n/);
    toppings.map((item) => {
      if (item) {
        payload.push(item);
      }
    });
    return res.json({ success: true, payload: payload });
  });
});

app.post("/pizzas-by-topping", (req, res) => {
  var dataToSend;

  const python = spawn("python3", [
    "./ontology/getPizzas_By_Topping.py",
    req.body.topping,
  ]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);

    let payload = [];
    if (!dataToSend) {
      return res.json({ success: true, payload: payload });
    }

    dataToSend = dataToSend.split(/\r?\n/);
    dataToSend.map((item) => {
      if (item) {
        payload.push(item);
      }
    });
    return res.json({ success: true, payload: payload });
  });
});

app.post("/toppings-by-spiciness", (req, res) => {
  var dataToSend;
  const python = spawn("python3", [
    "./ontology/getToppings_By_Spiciness.py",
    req.body.spiciness,
  ]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);

    let payload = [];
    if (!dataToSend) {
      return res.json({ success: true, payload: payload });
    }

    dataToSend = dataToSend.split(/\r?\n/);
    dataToSend.map((item) => {
      if (item) {
        payload.push(item);
      }
    });
    return res.json({ success: true, payload: payload });
  });
});

app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
