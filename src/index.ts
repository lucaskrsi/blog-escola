import { App } from "./App";
const port = process.env.PORT || 3000;
new App().server.listen(port);