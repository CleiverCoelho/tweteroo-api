import express from "express";
import cors from "cors"

const USUARIOS = [
  {
    "username": "bobesponja",
    "avatar": "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
  }
]

const TWEETS = [];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuarios", (req, res) => {
  res.send(USUARIOS);
})

app.post("/sign-up",(req, res) => {
  const usuario = req.body;
  // console.log(typeof(usuario.avatar));
  // if(!usuario.avatar || !usuario.username || typeof(usuario.avatar !== "string") || typeof(usuario.username) !== "string"){
  //   return res.status(400).send("Todos os campos são obrigatórios!");
  // }
  USUARIOS.push(usuario);
  res.status(200).send("OK");
});

app.post("/tweets", (req, res) => {
  // const user = req.headers.user;
  const tweet = req.body;
  TWEETS.push(tweet);
  res.send("OK");
})

app.get("/tweets", (req, res) => {
  
  const dezPrimeiros = TWEETS.filter((elemento, index) => {
    if(index < 9){
      // console.log(index)
      return true
    }
  })

  const tweetsAvatares = dezPrimeiros.map((elemento, index) => {
    const user = USUARIOS.find((findUsername) => findUsername.username === elemento.username)
    const novoObj = {
      username: user.username,
      avatar: user.avatar,
      tweet: elemento.tweet
    }
    return novoObj;
  })
  res.send(tweetsAvatares);
})


app.listen(5000);