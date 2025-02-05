export class Utilizador {
  constructor(
    public _id?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public nif?: string,
    public position?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}

export class Doador extends Utilizador {
  constructor(
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    nif?: string,
    position?: string,
    created_at?: Date,
    updated_at?: Date,
    public points?: number,
    public phone?: string,
    public city?: string,
    public address?: string,
    public age?: number,
    public gender?: string,
    public image?: String,
    public codigoAngariador?: string,
    public codigoAngariadorIndicado?: string
  ) {
    super(_id, name, email, password, nif, position, created_at, updated_at);
  }
}

export class Entidade extends Utilizador {
  constructor(
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    nif?: string,
    position?: string,
    created_at?: Date,
    updated_at?: Date,
    public phone?: string,
    public city?: string,
    public address?: string,
    public missao?: string,
    public atividades?: string,
    public website?: string,
    public images?: String[],
    public estadoRegisto?: string,
    public administrador?: string
  ) {
    super(_id, name, email, password, nif, position, created_at, updated_at);
  }
}
