const express = require("express");
const { spawn } = require("child_process");
var cors = require("cors");
const app = express();
const port = 2554;

app.use(express.json());
app.use(cors());

// Get all toppings
app.get("/toppings", (req, res) => {
  var dataToSend;
  const python = spawn("python3", ["./ontology/getToppings.py"]);
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

// Get all countries
app.get("/countries", (req, res) => {
  var dataToSend;
  const python = spawn("python3", ["./ontology/getCountries.py"]);
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
        let flag = "";
        if (item === "America") {
          flag = "🇺🇸";
        } else if (item === "England") {
          flag = "🇬🇧";
        } else if (item === "France") {
          flag = "🇫🇷";
        } else if (item === "Germany") {
          flag = "🇩🇪";
        } else if (item === "Italy") {
          flag = "🇮🇹";
        }
        payload.push({
          flag: flag,
          name: item,
        });
      }
    });
    return res.json({ success: true, payload: payload });
  });
});

// Get all pizzas
app.get("/pizzas", (req, res) => {
  var dataToSend;
  const python = spawn("python3", ["./ontology/getPizzas.py"]);
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

// Get all toppings by pizza
app.post("/toppings-by-pizza", (req, res) => {
  var dataToSend;
  const python = spawn("python3", [
    "./ontology/getPizzaToppings.py",
    req.body.pizza,
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

    dataToSend = JSON.parse(dataToSend);
    dataToSend.map((item) => {
      payload.push({
        topping: item.topping,
        spice: item.spice,
      });
    });
    return res.json({ success: true, payload: payload });
  });
});

// Get all pizzas by topping
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

// Get all pizzas by country
app.post("/pizzas-by-country", (req, res) => {
  var dataToSend;
  const python = spawn("python3", [
    "./ontology/getPizzas_By_Country.py",
    req.body.country,
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

// Get all toppings by spiciness
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
