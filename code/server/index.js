import { app } from './src/global.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening the port ${PORT}`);
});
