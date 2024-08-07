import serverconfig from "./config/serverconfig"
import app from './app'
app.listen(serverconfig.port, () => {
  console.log('server listen ',serverconfig.port);
});