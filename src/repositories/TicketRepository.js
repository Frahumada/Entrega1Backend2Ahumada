import {createTicket, getTicketByCode} from '../dao/TicketDAO.js';

class TicketRepository {
  async createTicket(data) {
    return await createTicket(data);
  }

  async getTicketByCode(code) {
    return await getTicketByCode(code);
  }
}

export default new TicketRepository();
