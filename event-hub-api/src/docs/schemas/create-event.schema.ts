/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - postalcode
 *         - address
 *         - capacity
 *         - ticket
 *         - price
 *         - category
 *         - createdBy
 *         - startDate
 *       properties:
 *         title:
 *           type: string
 *           example: "Soirée Jazz Live"
 *         description:
 *           type: string
 *           example: "Concert live + restauration sur place."
 *         postalcode:
 *           type: string
 *           example: "75011"
 *         address:
 *           type: string
 *           example: "5 Rue du Faubourg Saint-Denis, Paris"
 *         capacity:
 *           type: integer
 *           example: 120
 *         ticket:
 *           type: integer
 *           example: 100
 *         price:
 *           type: number
 *           example: 22.5
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           example: ["musique", "festival"]
 *         createdBy:
 *           type: string
 *           example: "asso_music"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2026-02-15T19:30:00.000Z"
 */
export {};