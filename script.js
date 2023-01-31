/* True Yuen, Web Development Section 85 (Periods 7-8 Even)

    1) Programs communicate the client requests something and the server responds accordingly for 
    a given purpose using HTTP requests such as GET, POST, PUT, and DELETE.
    
    2) I learned how APIs work and how to filter through certain properties (ex. name, genre, month, year) in 
    order to search for certain things efficient and be as useful as possible. 

    3) This project could be further extended by adding more parameters and having us filter through the array data
    in different ways.
*/
const express = require('express');
const app = express();
app.use(express.json());

const musicList = [
    {
        id: 1,
        name: "Pop",
        genre: "pop",
        month: "May",
        year: "2001",
    },
    {
        id: 2,
        name: "It's Gonna Be Me",
        genre: "pop",
        month: "June",
        year: "2000"
    },
    {
        id: 3,
        name: "Empire State of Mind",
        genre: "hip hop",
        month: "October",
        year: "2009"
    },
    {
        id: 4,
        name: "Baby Got Back",
        genre: "hip hop",
        month: "May",
        year: "1992"
    },
    {
        id: 5,
        name: "Welcome to the Party",
        genre: "rap",
        month: "April",
        year: "2019"
    },
    {
        id: 6,
        name: "Money Mouf",
        genre: "rap",
        month: "September",
        year: "2020"
    },
    {
        id: 7,
        name: "Symphony No. 5 in C Minor, Op. 67",
        genre: "classical",
        month: "December",
        year: "1808"
    },
    {
        id: 8,
        name: "Don Giovanni, K. 527",
        genre: "classical",
        month: "October",
        year: "1787"
    },
    {
        id: 9,
        name: "Bohemian Rhapsody",
        genre: "rock",
        month: "October",
        year: "1975"
    },
    {
        id: 10,
        name: "Highway to Hell",
        genre: "rock",
        month: "July",
        year: "1979"
    },
    {
        id: 11,
        name: "Hotel California",
        genre: "jazz",
        month: "December",
        year: "1976"
    },
    {
        id: 12,
        name: "Fly Me To The Moon",
        genre: "jazz",
        month: "April",
        year: "1954"
    },
    {
        id: 13,
        name: "Nobody Knows You When You're Down and Out",
        genre: "blues",
        month: "September",
        year: "1929"
    },
    {
        id: 14,
        name: "Hoochie Coochie Man",
        genre: "blues",
        month: "January",
        year: "1954"
    },
    {
        id: 15,
        name: "Don't You Worry Child",
        genre: "electronic",
        month: "September",
        year: "2012"
    },
    {
        id: 16,
        name: "Fireflies",
        genre: "electronic",
        month: "July",
        year: "2009"
    }
]

//http route for GET requests
app.get('/api/musicList', (req, res) => {
    let music = musicList;
    if (req.body.month && req.body.year) {
        music = musicList.filter(m => m.month === req.body.month && m.year === req.body.year);
    }
    res.send(music);
});

//request course by id
app.get('/api/musicList/:id', (req, res) => {
    const music = musicList.find(m => m.id === parseInt(req.params.id));
    if (!music) {
        res.status(404).send("The music with the given ID wasn't found");
        return;
    }
    res.send(music);
})

//http POST requests route
app.post('/api/musicList', (req, res) => {
    if (!req.body.name) {
        res.status(400).send("Missing song name");
        return;
    }
    if (req.body.name.length < 1 || req.body.name.length > 100) {
        res.status(400).send("The length of the song name must be between 1 to 100 characters"); 
        return;
    }
    if (!req.body.genre) {
        res.status(400).send("Missing song genre");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length > 30) {
        res.status(400).send("The length of the song genre must be between 3 to 30 characters"); //condition
    }
    if (!req.body.month) {
        res.status(400).send("Missing release month of song");
        return;
    }
    if (!req.body.year) {
        res.status(400).send("Missing release year of song");
        return;
    }
    let music = {
        id: musicList.length + 1,
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month,
        year: req.body.year
    };
    musicList.push(music);
    res.status(200).send(music);
});

//http PUT requests route
app.put('/api/musicList/:id', (req, res) => {
    if (!req.body.name) {
        res.status(404).send("Missing song name");
        return;
    }
    if (req.params.id < 0 || req.params.id > musicList.length) {
        res.status(400).send("Invalid id");
        return;
    }
    if (req.body.name.length < 1 || req.body.name.length > 100) {
        res.status(400).send("The length of the song name must be between 1 to 100 characters");
        return;
    }
    if (!req.body.genre) {
        res.status(400).send("Missing song genre");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length > 30) {
        res.status(400).send("The length of the song genre must be between 3 to 30 characters"); //condition
        return;
    }
    if (!req.body.month) {
        res.status(400).send("Missing release month of song");
        return;
    }
    if (!req.body.year) {
        res.status(400).send("Missing release year of song");
        return;
    }
    musicList[req.params.id - 1] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month,
        year: req.body.year
    }
    res.status(200).send(musicList[req.params.id - 1]);
});

//http DELETE requests route
app.delete('/api/musicList/:id', (req, res) => {
    const music = musicList.find(m => m.id === parseInt(req.params.id));
    if (!music) {
        res.status(404).send("Couldn't find song");
        return;
    }
    let objIndex = musicList.indexOf(music);
    musicList.splice(objIndex, 1);
    musicList.forEach((obj, index) => {
        obj.id = index + 1;
    })
    res.status(200).send("Song deleted successfully");
});

app.listen(3000, () => { 
    console.log('Listening on Port 3000...'); 
});