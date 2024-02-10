

const progressMap = new Map<string, number>()

export function setProgress(name: string, progress: number) {
    progressMap.set(name, progress)
}

export function getProgress(name) {
    return progressMap.get(name)
}