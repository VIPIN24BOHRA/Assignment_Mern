let superheroes = [
  {
    id: "1",
    name: " spider-man",
    age: "25",
    planet: "Earth",
    weapons: "spider Web",
  },
  {
    id: "2",
    name: "Captain America",
    age: "35",
    planet: "Earth",
    weapons: "shield",
  },
  {
    id: "3",
    name: "Black Panther",
    age: "41",
    planet: "Earth",
    weapons: "Vibranium",
  },
  {
    id: "4",
    name: "Thor",
    age: "100",
    planet: "Asgard",
    weapons: "Hammer",
  },
  {
    id: "5",
    name: "Iron-Man",
    age: "50",
    planet: "Earth",
    weapons: "Iron man suit",
  },
  {
    id: "6",
    name: "The Hulk",
    age: "200",
    planet: "Earth",
    weapons: "Body",
  },
  {
    id: "7",
    name: "Deadpool",
    age: "36",
    planet: "Earth",
    weapons: "Sword,knives,grenade",
  },
  {
    id: "8",
    name: "War Machine",
    age: "45",
    planet: "Earth",
    weapons: "Armor",
  },
  {
    id: "9",
    name: "Hawkeye",
    age: "60",
    planet: "Earth",
    weapons: "Bow & Arrow",
  },
  {
    id: "10",
    name: "Captain Marvel",
    age: "24",
    planet: "Earth",
    weapons: "Super-natural power",
  },
];

const { read } = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET,DELETE",
    "Content-Type": "application/json", //keep in mind that the content you will send will go in json format hence it must in clear josn.
  });
  if (path.pathname == "/" || path.pathname == "/superheroes") {
    res.write(JSON.stringify(superheroes));
    res.end();
  } else if (path.pathname == "/superhero") {
    const id = path.query.id;

    if (req.method == "GET") {
      res.write(JSON.stringify(superheroes.find((ele) => ele.id == id)));
      res.end();
    } 
    else if (req.method == "POST") {
      let data = "";
      req.on("data", (ele) => {
        data += ele;
      });

      req.on("end", () => {
        data = JSON.parse(data);
        superheroes.push(data);
        res.end(JSON.stringify(superheroes));
      });
    }

    else if(req.method=="PUT"){
      let data = "";
      req.on("data", (ele) => {
        data += ele;
      });

      req.on("end", () => {
        data = JSON.parse(data);
         superheroes.forEach((a)=>{

          if(a.id==id){
            a.name=data.name;
            a.age=data.age;
            a.planet=data.planet;
            a.weapons=data.weapons;
           
           
            return;

          }


         })
       
        res.end("data has been updated on the server");
      });


    }
else if(req.method=="DELETE"){

    superheroes=superheroes.filter(a=>a.id!=id);

   console.log(superheroes);
   res.end("the id has been delete from the server");

}


  }

  else {

      res.writeHead(404);
      res.end("404 the data for specific url doesn't exist on the server");

  }
});

server.listen("3000", "127.0.0.1", (err) => {
  if (!err) console.log("server is running");
  else console.log("their is some error: " + err);
});
