const express = require('express');
const app = express();
const PORT = 3000;
const linksRouter = require('./routes/links');
const pagesRouter = require('./routes/pages');
const userRouter = require('./routes/user');

app.use(express.json());

app.use('/api/links', linksRouter);
app.use('/api/users', userRouter);
app.use('/', pagesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});