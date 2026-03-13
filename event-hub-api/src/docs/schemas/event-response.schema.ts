/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id: { type: string, example: "evt-001" }
 *         title: { type: string, example: "Soirée Jazz Live" }
 *         description: { type: string, example: "Concert live + restauration sur place." }
 *         postalcode: { type: string, example: "75011" }
 *         address: { type: string, example: "5 Rue du Faubourg Saint-Denis, Paris" }
 *         capacity: { type: integer, example: 120 }
 *         ticket: { type: integer, example: 100 }
 *         price: { type: number, example: 22.5 }
 *         category:
 *           type: array
 *           items: { type: string }
 *           example: ["musique", "festival"]
 *         createdBy: { type: string, example: "asso_music" }
 *         startDate: { type: string, format: date-time, example: "2026-02-15T19:30:00.000Z" }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     ApiError:
 *       type: object
 *       properties:
 *         message: { type: string, example: "Événement introuvable." }
 *         code: { type: integer, example: 404 }
 *         details: { type: object, nullable: true }
 *
 *     ApiSuccessEvent:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           $ref: '#/components/schemas/Event'
 *
 *     ApiSuccessEvents:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *
 *     ApiFailure:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: false }
 *         data: { nullable: true, example: null }
 *         error:
 *           $ref: '#/components/schemas/ApiError'
 */
export {};