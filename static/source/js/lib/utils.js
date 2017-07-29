export const dateFormatter = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const d = new Date(date)
  // FIXME - properly parse & convert timezone instead of adding 1 to getDate
  return `${months[d.getMonth()]} ${d.getDate() + 1}, ${d.getFullYear()}`
}