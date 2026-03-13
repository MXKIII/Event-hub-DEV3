import app from "./app.js";
import { initializeMongoose } from "./config/mongoose.config.js";

const PORT = process.env.PORT || 8100;



const startServer = async () => {
    await initializeMongoose();

    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`)
    })
}

startServer().then(() => console.log('✅ Server started'))