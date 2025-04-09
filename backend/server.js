const express = require("express");
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Welcome TO BOOKSWAP!!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
