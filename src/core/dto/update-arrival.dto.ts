import { PartialType } from "@nestjs/swagger";
import { CreateTicketDto } from "./create-ticket.dto";

export class UpdateArrivalDto extends PartialType(CreateTicketDto) { }
