/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Supprimer un événement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: evt-001
 *     responses:
 *       204:
 *         description: Événement supprimé (No Content)
 *       404:
 *         description: Événement introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
export {};