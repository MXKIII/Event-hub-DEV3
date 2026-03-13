import mongoose, { type InferSchemaType } from "mongoose";


export const EventSchema = new mongoose.Schema({
    eventName: String,
    userId: String,
    page: String,
    timestamp: Date,
},{
    timestamps: true,
} );


export type Event = InferSchemaType<typeof EventSchema>;

export const EventModel = mongoose.model<Event>("Event", EventSchema);