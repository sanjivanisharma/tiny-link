const express = require('express');
const app = express();
const PORT = 3000;
const linksRouter = require('./routes/links');
const pagesRouter = require('./routes/pages');

app.use(express.json());

app.use('/api/links', linksRouter);
app.use('/', pagesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});