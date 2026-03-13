import fs from "node:fs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swagger.config.ts";

const outputFile = "./docs/swagger-output.json";

const spec = swaggerJSDoc(swaggerOptions);
fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2), "utf-8");

console.log(`✅ Swagger généré: ${outputFile}`);