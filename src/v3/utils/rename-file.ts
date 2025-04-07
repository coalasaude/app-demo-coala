export function renameFile(existingFile: File, newFileName: ((oldName:string) => string) | string): File {
    const { fileNameOnly, fileExtension } = extractFilename(existingFile)
    
    let newFullFileName = ''
    if (typeof newFileName === 'string') {
        newFullFileName = newFileName + fileExtension
    } else {
        newFullFileName = newFileName(fileNameOnly) + fileExtension
    }
    return new File([existingFile], newFullFileName, { type: existingFile.type })
}

export function extractFilename(file: File) {
    const lastDotIndex = file.name.lastIndexOf('.')
    const fileExtension = lastDotIndex !== -1 ? file.name.slice(lastDotIndex) : ''
    const fileNameOnly = lastDotIndex !== -1 ? file.name.slice(0, lastDotIndex) : file.name
    return { fileNameOnly, fileExtension }
}