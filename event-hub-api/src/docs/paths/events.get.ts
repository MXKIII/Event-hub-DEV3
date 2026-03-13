/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Récupérer tous les événements
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccessEvents'
 */
export {};