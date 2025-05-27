export interface Profissional {
    id: string 
    nome: string
    profissao?: string
    fotoPerfil?: string 
    [key: string]: any
}

export interface Servico {
    nome: string 
    descricao: string
    duracao: number 
    valor: number 
    uid: string
    id?: string
}

export interface Agendamento {
    horaInicio: string
    horaFim: string 
    observacao: string 
    profId: string
    servId: string
    clieId: string 
    status: string
}