import { Category } from "../category/value-object/category.js";

export interface EventProps {
  id: string;
  title: string;
  description: string;
  postalcode: string;
  address: string;
  capacity: number;
  ticket: number;
  price: number;
  category: Category[];
  createdBy: string;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  status?: "active" | "cancelled";
}

export class Event {
  private props: EventProps;

  constructor(props: EventProps) {
    this.validate(props);
    this.props = {
      id: props.id,
      title: props.title,
      description: props.description,
      postalcode: props.postalcode,
      address: props.address,
      capacity: props.capacity,
      ticket: props.ticket,
      price: props.price,
      category: props.category,
      createdBy: props.createdBy,
      startDate: props.startDate,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      status: props.status ?? "active",
    };
  }

  getProps(): Readonly<EventProps> {
    return {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      postalcode: this.props.postalcode,
      address: this.props.address,
      capacity: this.props.capacity,
      ticket: this.props.ticket,
      price: this.props.price,
      category: [...this.props.category],
      createdBy: this.props.createdBy,
      startDate: this.props.startDate,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      status: this.props.status ?? "active",
    };
  }

  hasEmptyTitle() {
    return !this.props.title;
  }

  hasEmptyPostalcode() {
    return !this.props.postalcode;
  }

  hasEmptyAddress() {
    return !this.props.address;
  }

  hasInvalidStartDate() {
    const now = new Date();
    return this.props.startDate <= now;
  }

  hasInvalidCapacity() {
    return this.props.capacity <= 0;
  }

  hasInvalidTicketCount() {
    return this.props.ticket > this.props.capacity;
  }

  hasInvalidPrice() {
    return this.props.price < 0;
  }

  private validate(props: EventProps): void {
    if (!props.title || props.title.trim() === "") {
      throw new Error("Le titre est requis.");
    }

    if (!props.postalcode || props.postalcode.trim() === "") {
      throw new Error("Le code postal est requis.");
    }

    if (!props.address || props.address.trim() === "") {
      throw new Error("L'adresse est requise.");
    }

    const now = new Date();
    if (props.startDate <= now) {
      throw new Error("La date de début doit être dans le futur.");
    }

    if (props.capacity <= 0) {
      throw new Error("La capacité doit être un nombre positif.");
    }

    if (props.ticket > props.capacity) {
      throw new Error("Le nombre de tickets disponibles ne peut pas dépasser la capacité.");
    }

    if (props.price < 0) {
      throw new Error("Le prix doit être supérieur ou égal à zéro.");
    }
  }

  static reconstitute(props: EventProps): Event {
    const event = Object.create(Event.prototype) as Event;
    event["props"] = props;
    return event;
  }

  cancel(organizerId: string): void {
    if (this.props.createdBy !== organizerId) {
      throw new Error("Seul l'organisateur de l'événement peut annuler cet événement.");
    }
    if (this.props.status === "cancelled") {
      throw new Error("L'événement est déjà annulé.");
    }
    if (this.props.startDate < new Date()) {
      throw new Error("Impossible d'annuler un événement passé.");
    }
    this.props.status = "cancelled";
  }
}