import express from "express";
import MOCK_DATA from "./MOCK_DATA.json" with { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;
const users = MOCK_DATA

//middleware 
app.use(express.urlencoded({extended: false}))
app.get("/users", (req,res) =>{
    return res.json(users);
})
app.post("/api/users",(req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1} );
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) , (err,data) =>{});
    return res.status("201").json({status : "succced"})
})
app
.route("/api/users/:id")
.patch((req, res) => {
    const id = Number(req.params.id)
    const body = req.body;

    const user = users.find((user) => user.id === id)
    
    return res.json(user)
})

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`))