require('dotenv').config();
const app = require('./api');
const controller = require('./controller');
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');
const postController = require('./controller/postController');
const middlewares = require('./middlewares');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));
app.post('/login', controller.login);
app.post('/user', userController.createUser);
app.get('/user', middlewares.authToken, userController.getAll);
app.get('/user/:id', middlewares.authToken, userController.getById);

app.post('/categories', middlewares.authToken, categoryController.createCategory);
app.get('/categories', middlewares.authToken, categoryController.getAll);

app.post('/post', middlewares.authToken, postController.createPost);
app.get('/post/search', middlewares.authToken, postController.searchPost);
app.get('/post', middlewares.authToken, postController.getAll);
app.get('/post/:id', middlewares.authToken, postController.getById);
app.put('/post/:id', middlewares.authToken, postController.update);
app.delete('/post/:id', middlewares.authToken, postController.deletePost);

app.delete('/user/me', middlewares.authToken, userController.deleteMe);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(middlewares.errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
