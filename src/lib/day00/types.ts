export enum CellStyle {
    NORMAL,
    DISABLED,
    WIN
}
export interface Borders {
    left?: boolean
    right?: boolean
    top?: boolean
    bottom?: boolean
}

export interface Cell {
    value?: string
    style: CellStyle
}

export enum CellValue {
    O = 'O',
    X = 'X'
}

export type Player = { player: CellValue; score: number };