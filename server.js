// todo -------------------------- / --------------------------

const express = require("express")
const app = express()
const port = 8080

const connectDB = require("./db/connection")
connectDB()
const playerModel = require("./models/player")
const adminModel = require("./models/admin")

const cors = require("cors")
const corsOptions = {
    // origin: "http://localhost:5173"
    origin: "https://championchessclasses.in/"
}
app.use(cors(corsOptions))

app.use(express.json());

// todo -------------------------- / --------------------------

app.get("/", (req, res) => {
    res.json("This is Home Page")
})

// todo -------------------------- Admin --------------------------

app.post("/admin/adminLogin", async (req, res) => {

    const { username, password } = req.body

    // console.log(username);
    // console.log(password);

    const admin = await adminModel.findOne({ username: username })
    console.log(admin)

    if (!admin) {
        return res.status(500).json({ error: "Admin not Found" })
    }

    if (admin.password !== password) {
        return res.status(500).json({ error: "Password doesn't Match" })
    }

    return res.status(200).json({ message: "Admin Logged in Successfully" })

})

app.post("/admin/createPlayer", async (req, res) => {

    const { playerData } = req.body
    try {
        await playerModel.create(playerData)
        res.status(200).json({ message: "Account Created" })
    } catch (error) {
        res.status(401).json({ error: `Account is not created ${error}` })
    }

})

app.post("/admin/updatePlayer", async (req, res) => {
    const { playerData2 } = req.body

    console.log(playerData2);

    try {
        await playerModel.findOneAndUpdate(
            { username: playerData2.username },
            { ...playerData2 },
            { new: true }
        )
        res.status(200).json({ message: "Account Updated Successfully" })
    } catch (error) {
        res.status(200).json({ error: `Account Updated Successfully ${error}` })
    }

})

app.get("/admin/getAllPlayers", async (req, res) => {

    try {
        const allPlayers = await playerModel.find()

        if (!allPlayers) {
            return res.status(404), json({ error: "Players not found" })
        }

        return res.status(200).json({ allPlayers })


    } catch (error) {
        return res.status(500), json({ error: "Problem in Fetching" })

    }

})

app.get("/getAllPlayers", async (req, res) => {

    try {
        const allPlayers = await playerModel.find()

        if (!allPlayers) {
            return res.status(404), json({ error: "Players not found" })
        }

        return res.status(200).json({ allPlayers })


    } catch (error) {
        return res.status(500), json({ error: "Problem in Fetching" })

    }

})

app.post("/admin/addTournamentData", async (req, res) => {
    const { playersTournamentData2, tournamentType, tournamentName } = req.body
    // console.log(playersTournamentData2);
    // console.log(tournamentType);
    // console.log(tournamentName);

    // todo ---------------------- method 1 ----------------------------------

    // playersTournamentData2.map(async (player) => {
    //     try {
    //         await playerModel.findOneAndUpdate(
    //             { username: player.username },
    //             { $pull: { [tournamentType]: { name: tournamentName } } },
    //             // { new: true }
    //         )
    //         await playerModel.findOneAndUpdate(
    //             { username: player.username },
    //             {
    //                 $push: {
    //                     [tournamentType]: {
    //                         name: tournamentName,
    //                         score: player.score,
    //                         totalRounds: player.totalRounds,
    //                     }

    //                 }
    //             },
    //             // { new: true }
    //         )
    //         console.log("success");

    //     } catch (error) {
    //         console.log(error);
    //     }

    // })


    // ? WHY THIS DOESNT WORK 

    // vedmantra: {
    //     monthly_offline_tournament: [
    //         { name: "Jan_2025", score: 3, totalRounds: 7 },
    //         { name: "Feb_2025", score: 2, totalRounds: 7 },
    //     ]
    // }

    // pull and push approach 
    // name = Jan_2025 
    // update to score = 2, totalRounds = 7

    // this way we pull(delete) { name: "Jan_2025", score: 3, totalRounds: 7 }
    // and add { name: "Jan_2025", score: 2, totalRounds: 7 }

    // but the new sequence becomes
    // vedmantra: {
    //     monthly_offline_tournament: [
    //         { name: "Feb_2025", score: 2, totalRounds: 7 },
    //         { name: "Jan_2025", score: 2, totalRounds: 7 },
    //     ]
    // }

    // thats why we need another approach
    // if doesnt exists => add like this only
    // but if do exists => update the same 

    // ? SO WE ARE USE THE FOLLOWING METHOD 

    // todo ---------------------- method 2 ----------------------------------

    playersTournamentData2.map(async (player) => {
        const existing = await playerModel.findOne({
            username: player.username,
            // [tournamentType.name]: tournamentName
            [`${tournamentType}.name`]: tournamentName
        })

        if (existing) {
            //  Tournament name exists → update it
            // console.log("Tournament Name Exists - Update it");

            await playerModel.findOneAndUpdate(
                { username: player.username, [`${tournamentType}.name`]: tournamentName },
                {
                    $set: {
                        [`${tournamentType}.$.score`]: player.score,
                        [`${tournamentType}.$.totalRounds`]: player.totalRounds,
                    }
                }
            )

            console.log("Updated");
        } else {
            //  Tournament name doesn’t exist → add it
            // console.log("Tournament Name Doesn't Exists - Add it");

            await playerModel.findOneAndUpdate(
                { username: player.username },
                {
                    $push: {
                        [tournamentType]: {
                            name: tournamentName,
                            score: player.score,
                            totalRounds: player.totalRounds,
                        }
                    }
                },
                { new: true }
            )

            console.log("Added");
        }

    })

})

app.post("/admin/stats", async (req, res) => {
    const { playerStatsArray2, month, level_stats } = req.body

    playerStatsArray2.map(async (player) => {

        const existed = await playerModel.findOne({
            username: player.username,
            [`${level_stats}.month`]: month
        })

        // if (existed) {
        //     console.log("updating");
        //     const updatedGuyy = await playerModel.findOneAndUpdate(
        //         // { username: "vedmantrabhosale9115", "intermediate_stats.month": "Julyy" },
        //         // { username: "vedmantrabhosale9115", [`${level_stats}.month`]: month },
        //         { username: player.username, [`${level_stats}.month`]: month },
        //         {
        //             $set: {
        //                 [`${level_stats}.$.opening`]: player.opening,
        //                 [`${level_stats}.$.middlegame`]: player.middlegame,
        //             }
        //         }
        //     )

        //     console.log("updated");
        // }
        if (existed) {

            const { username, ...rest } = player
            const updateData = {}
            for (const key in rest) {
                updateData[`${level_stats}.$.${key}`] = rest[key]
            }

            await playerModel.findOneAndUpdate(
                { username: player.username, [`${level_stats}.month`]: month },
                { $set: updateData }
            )

        }
        else {
            await playerModel.findOneAndUpdate(
                { username: player.username },
                {
                    $push: {
                        // "intermediate_stats": {
                        [level_stats]: {
                            // month: "july",
                            month: month,
                            // opening: player.opening,
                            // middlegame: player.middlegame
                            ...player
                        }
                    }
                },
                { new: true }
            )
        }
    })

})

// todo -------------------------- Player Profile --------------------------

app.post("/readplayer", async (req, res) => {

    const { username, password } = req.body

    const player = await playerModel.findOne({ "username": username })
    if (!player) {
        return res.status(404).json({ err: "There is no player with the username" })
    }

    if (password !== player.password) {
        return res.status(404).json({ err: "Incorrect Password" })
    }

    return res.status(200).json({ player: player, msg: "Login Successful" })
})

app.post("/playerProfile", async (req, res) => {
    const { loggedPlayerUsername } = req.body
    // console.log(loggedPlayerUsername);

    const loggedPlayerData = await playerModel.findOne({ "username": loggedPlayerUsername })
    if (!loggedPlayerData) {
        return res.status(404).json({ error: "Player not found" })
    }

    return res.status(200).json({ loggedPlayerData })
})

app.post("/admin/updateOtherStats", async (req, res) => {

    const { playersStatsData2 } = req.body

    console.log(playersStatsData2)

    playersStatsData2.map(async (player) => {
        console.log(player)
        const updatedStats = await playerModel.findOneAndUpdate(

            { "username": player.username },
            {
                stats_playstyle: {
                    ...player
                }
            },
            { new: true }
        )
    })
    
    res.json("done")
})
// todo -------------------------- / --------------------------

app.listen(port, () => {
    console.log('Server is Running on port 8080');
})