export function formatTime(dateStr, t) {
    const created = new Date(dateStr);
    const now = new Date();
    const diffMs = now - created;

    const totalMinutes = Math.floor(diffMs / 60000);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const days = totalDays;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    let result = t("ago") + " ";

    if (days > 0) {
        result += `${days} ${t(days === 1 ? "day" : "days")}`;
        if (hours > 0) {
            result += ` ${t("and")} ${hours} ${t(hours === 1 ? "hour" : "hours")}`;
        }
    } else if (hours > 0) {
        result += `${hours} ${t(hours === 1 ? "hour" : "hour")}`;
    } else {
        result += `${minutes} ${t(minutes === 1 ? "minute" : "minutes")}`;
    }

    return result;
}
