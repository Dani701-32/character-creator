import express from "express"; 
import cors from 'cors';
import characterRoutes from './routes/characterRoute.js'

const app = express();
const port = 3000; 
app.use(cors());
app.use(express.json());

app.use('/api', characterRoutes); 

app.listen(port, () => {
    console.log('listening on port 3000')
});

