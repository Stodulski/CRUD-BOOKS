import moment from 'moment'

export const validateDNI = (value: string): boolean => {
  const dniPattern = /^\d{8}$/
  return dniPattern.test(value)
}

export const validateCUIT = (value: string): boolean => {
  const cuitPattern = /^\d{2}-\d{8}-\d{1}$/
  return cuitPattern.test(value)
}

export const normalizeDate = (date: string): string => {
  const formats = ['DD/MM/YYYY', 'DD/MM/YY']
  for (const format of formats) {
    const parsedDate = moment(date, format, true)
    if (parsedDate.isValid() === true) {
      return parsedDate.toISOString()
    }
  }
  throw new Error('Invalid date format')
}
