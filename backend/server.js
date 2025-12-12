import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import {connectDB} from './config/db.js';

import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());

app.use(cors());
app.use("/api/users", authRoutes)

connectDB();

// Print registered routes for debugging
function listRoutes() {
    const routes = [];
    if (!app._router || !app._router.stack) {
        console.log('No routes registered yet (app._router is undefined)');
        return;
    }

    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // routes registered directly on the app
            const path = middleware.route.path;
            const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
            routes.push(`${methods} ${path}`);
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach(function(handler) {
                const route = handler.route;
                if (route) {
                    const path = route.path;
                    const methods = Object.keys(route.methods).join(',').toUpperCase();
                    routes.push(`${methods} ${path}`);
                }
            });
        }
    });
    console.log('Registered routes:');
    routes.forEach(r => console.log('  ' + r));
}

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
    listRoutes();
});

