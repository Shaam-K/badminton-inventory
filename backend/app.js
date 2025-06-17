const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const brandRouter = require('./routes/brandRouter');
const racquetRouter = require('./routes/racquetRouter')

global.appRoot = path.resolve(__dirname);

require('dotenv').config();
// middle-ware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use("/brands",brandRouter); 
app.use("/racquets", racquetRouter);  

app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({error: err.message || "Something went wrong"});
});

PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`);
});
