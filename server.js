const app = require('./src/app');
const db = require('./src/database');

const PORT = 3000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)});