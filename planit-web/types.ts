export interface Profissional {
    id: string 
    nome: string
    profissao: string
    fotoPerfil?: string 
}

export interface Servicos {
    nome: string 
    descricao: string
    duracao: string 
    valor: string 
    uid: string
}