export const cleanTelephone = (phone: string) => phone?.replace(/\(|\)|\ |-/g, '')
