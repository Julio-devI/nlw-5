import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";


io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();


    const allConectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConectionsWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;

        const allmessages = await messagesService.listByUser(user_id);

        callback(allmessages);
    });

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await connectionsService.findByUserid(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id,
        })
    });

    socket.on("admin_user_in_support", async params => {
        const { user_id } = params;
        await connectionsService.updateAdminID(user_id, socket.id);

        const allConectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allConectionsWithoutAdmin);
    })

});