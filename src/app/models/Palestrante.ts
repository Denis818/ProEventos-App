import { Evento } from "./Evento"
import { RedeSocial } from "./RedesSociais"

export interface Palestrante {
    id: number
    nome: string
    miniCurriculo: string
    imagemURL: string
    telefone: string
    email: string
    redesSociais:  RedeSocial[]
    palestranteEvento: Evento[]
}
