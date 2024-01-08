const express = require('express');
const cors = require('cors');
const {
    default: mongoose
} = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking');
const {
    resolve
} = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config()
const app = express();


const bcryptSalt = bcrypt.genSaltSync(6);
const jwtSecret = 'fsfafadf';
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'groza.emanuel4@gmail.com',
                    pass: 'stlqeaqphdmonyxm'
                }
            });
            const mailOptions = {
                from: 'groza.emanuel4@gmail.com',
                to: email,
                subject: 'Welcome',
                text: 'Thank you for sign up!'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    // do something useful
                }
            });
        } catch (e) {
            console.log(e);
        }
        res.json({
            userDoc
        });
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const userDoc = await User.findOne({
        email
    })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json("pass not ok")
        }
    } else {
        res.status(422).json('not found')
    }
})
app.get('/profile', (req, res) => {
    const {
        token
    } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {
                name,
                email,
                id
            } = await User.findById(userData.id);
            res.json({
                name,
                email,
                id
            });
        })
    } else {
        res.json(null);
    }
})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})
app.post('/upload-by-link', async (req, res) => {
    const {
        link
    } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})
const photosMiddleware = multer({
    dest: 'uploads/'
});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {
            path,
            originalname
        } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});
app.post('/places', (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(placeDoc);
    });
})
app.get('/user-places', (req, res) => {
    const {
        token
    } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {
            id
        } = userData;
        res.json(await Place.find({
            owner: id
        }));
    });
});
app.get('/places/:id', async (req, res) => {
    const {
        id
    } = req.params;
    res.json(await Place.findById(id));
});
app.put('/places', async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString() || userData.id === "6554a24e39d372c92793e076") {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            })
            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.delete('/places/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Place.findById(id).deleteOne();
    res.json('ok');
})

app.post('/bookings', async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        Booking.create({
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price,
            user: userData.id,
        }).then(async (doc) => {
            res.json(doc);
        }).catch((err) => {
            throw err;
        })
    })
});

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    })
}

app.get('/bookings', async (req, res) => {
    const {
        token
    } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        res.json(await Booking.find({
            user: userData.id
        }).populate('place'))
    })
})
app.get('/admin-users', async (req, res) => {
    res.json(await User.find({
        _id: {
            $ne: "6554a24e39d372c92793e076"
        }
    }));
})
app.get('/admin-users/:id', async (req, res) => {
    const {
        id
    } = req.params;
    res.json(await User.findById(id));
});
app.get('/admin-bookings/:id', async (req, res) => {
    const {
        id
    } = req.params;
    res.json(await Booking.findById(id));
});
app.put('/admin-users', async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        id,
        email,
        name
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async () => {
        const userDoc = await User.findById(id);
        userDoc.set({
            email,
            name
        });
        await userDoc.save();
        res.json('ok');
    });
})
app.put('/admin-bookings', async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        id,
        place,
        user,
        checkIn,
        checkOut,
        price,
        name
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async () => {
        const bookingDoc = await Booking.findById(id);
        bookingDoc.set({
            place,
            user,
            checkIn,
            checkOut,
            price,
            name
        });
        await bookingDoc.save();
        res.json('ok');
    });
})
app.delete('/admin-users/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await User.findById(id).deleteOne();
    res.json('ok');
})
app.delete('/admin-bookings/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Booking.findById(id).deleteOne();
    res.json('ok');
})
app.get('/admin-places', async (req, res) => {
    res.json(await Place.find());
});
app.get('/admin-bookings', async (req, res) => {
    res.json(await Booking.find().populate('place'));
})
app.listen(4000);