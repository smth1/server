export function CheckRequiredFields(fields: Array<string>, obj: { [x: string]: any; }) {
  for (const field of fields) {
    if (!obj[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  return true;

}