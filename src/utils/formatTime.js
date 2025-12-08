export function formatTime(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
