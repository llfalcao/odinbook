const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () =>
  console.log(`Server listening http://localhost:${port}`),
);
