import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as router from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.options('*', cors());
app.use('/api', router.routes);

export default app;

/**
 * The port number for the server.
 * If the `PORT` environment variable is set, it will use that value.
 * Otherwise, it will default to 8080.
 */
const port = process.env.PORT || 8080;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});
