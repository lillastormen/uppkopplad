import 'dotenv/config';
import app from './app.ts';
// import { mongoDBConnect } from './db/mongo.ts';
import mySqlDbConnection from './db/mysql.ts';

const PORT = Number(process.env.PORT) || 3000;

/* Middleware för senare
    app.use(express.json());
    app.use(cors());
    app.use('/api/lessons', lessonsRouter);
 */

// async function startMongoServer() {
//     try {
//         await mongoDBConnect();
//         console.log('Connected to mongoDB');
//         app.listen(PORT, () => {
//             console.log(`Server started and listening on port: ${PORT}`);
//         });
//     } catch (err) {
//         console.error('Server could not start: ', err);
//         process.exit(1);
//     }
// }

mySqlDbConnection.connect((error) => {
    if (error) {
        console.log('MySQL connection failed: ', error);
        process.exit(1);
    }

    console.log('MySQL connected successfully');

    app.listen(PORT, () => {
        console.log(`Server started and listening on port: ${PORT}`);
    });
});



// startMongoServer();