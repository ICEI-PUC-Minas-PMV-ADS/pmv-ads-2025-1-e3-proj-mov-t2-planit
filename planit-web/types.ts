export interface Profissional {
    id: string 
    nome: string
    profissao: string
    fotoPerfil?: string 
}

export interface Servico {
    nome: string 
    descricao: string
    duracao: string 
    valor: string 
    uid: string
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