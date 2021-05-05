import { http } from "./http";
import "./websocket/admin";
import "./websocket/client";

http.listen(3333, () => console.log("O servidor esta conectado na porta 3333"));