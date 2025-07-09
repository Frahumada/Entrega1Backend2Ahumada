import Ticket from '../models/Tickets.js';

export async function createTicket(data) {
  return await Ticket.create(data);
}

export async function getTicketByCode(code) {
  return await Ticket.findOne({ code });
}
