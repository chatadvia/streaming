import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { userRoutes } from './interfaces/routes/userRoutes';
import authRouter from './interfaces/routes/authRoutes';
import { movieRoutes } from './interfaces/routes/MovieRoutes'
import cors from 'cors';;

const app = express();
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

app.use(express.json());

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
