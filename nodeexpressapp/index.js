const express = require('express');
const app = express();

app.post('/', (request, response) => {
    console.log('Request Body:', request.body);
    console.log('Query Parameters:', request.query);
    console.log('URL Parameters:', request.params);
    console.log('URL:', request.url);
    
});

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
