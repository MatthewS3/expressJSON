import express from "express";
import axios from "axios";
import bodyParser from "bodyParser";
import cors from "cors";
// ============== EXPRESS APP:============== \\
const app = express();
// ============== ROUTER:============== \\
const router = express.Router();
// ============== PORT:============== \\
const port = +process.env.PORT || 4000;
// JSON URL: \\
const dataURL = "https://codjoelmayer.github.io/eompData/data/";
// ============== APPLICATION MIDDLEWARE:============== \\
app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  }),
  cors(),
  router
);
// / => home
router.get("^/$|/ejd", (req, res) => {
  res.json({
    status: res.statusCode,
    msg: "zaddy chill",
  });
});
// /educations
router.get("/education", async (req, res) => {
  try {
    let response = await axios.get(dataURL);
    let { education } = await response.data;
    res.json({
      status: res.statusCode,
      education,
    });
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "Please try again later.",
    });
  }
});
// /education/:id
router.get("/education/:id", async (req, res) => {
  try {
    let response = await fetch(dataURL);
    let { education } = await response.json();
    let params = +req.params.id;
    let idx = params > 0 ? params - 1 : 0;
    res.json({
      status: res.statusCode,
      education: education[idx],
    });
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "Please try again later.",
    });
  }
});
router.post("/addEducation", bodyParser.json(), async (req, res) => {
  try {
    let dataRes = await axios.post(dataURL, req.body);
    if (dataRes) {
            /*
            Please remove all consoles before you deploy your backend
            */
            console.log(resVal.data);
            res.json({
                status: res.statusCode,
                msg: "New record was added",
            });
    }
  } catch (e) {
    console.log(e.message);
    //
    res.json({
        status: res.statusCode,
        msg: 'An error has occurred when adding a new data'
    })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
