/* eslint-disable max-len */
export const replacePlaceholders = (text: string): string => {
  const exceptions = ['[Imagem gerada]', '[Documento gerado]', '[Leia mais]', '[Leia Mais]', '[Clique Aqui]', '[Clique aqui]', '[clique aqui]']

  exceptions.forEach(exception => {
    text = text.replace(exception, '__EXCEPTION__')
  })

  text = text.replace(/[<>{}[\]]/g, '**')

  exceptions.forEach(exception => {
    text = text.replace('__EXCEPTION__', exception)
  })

  return text
}
