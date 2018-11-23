import {Cliente} from './cliente';
import {Group} from './group';
export class CurrentUser {
    id: number;
    username: string;
    tipo: number;
    minDatePedido: Date;
    cliente: Cliente;
    group: Group;
}
