const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// DB options
const DBOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.set("strictQuery", false);

// DB
mongoose
    .connect(DB, DBOptions)
    .then(() => console.log(`DB Connected Successfully`));

    

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});