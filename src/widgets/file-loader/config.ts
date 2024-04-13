export interface HTMLInputEvent extends Event{
    target: HTMLInputElement & EventTarget
}

export type btnFLLabels = 'Выбрать файл'| 'Удалить'| 'Отменить'

export interface IJSONFile{
    name: string,
    lastModified: number,
    size: number,
    type: string,
    webkitRelativePath: string
}