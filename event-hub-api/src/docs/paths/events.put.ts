/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Mettre à jour un événement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: evt-001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccessEvent'
 *       404:
 *         description: Événement introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 *       422:
 *         description: Validation invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
export {};