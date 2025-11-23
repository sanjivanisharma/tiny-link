const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const linksRouter = require('./routes/links.route');
const userRouter = require('./routes/user.route');
const staticRouter = require('./routes/static.route');

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/links', linksRouter);
app.use('/api/users', userRouter);
app.use('/', staticRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});