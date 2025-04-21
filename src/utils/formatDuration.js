export function formatDuration(startStr, endStr) {
    const start = new Date(startStr);
    const end   = new Date(endStr);


    const delta = new Date(endStr).getTime() - Date.now();


    if (delta < 0) return "0 H : 0 M : 0 S";

    const totalSeconds = Math.floor(delta / 1000);
    const seconds      = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes      = totalMinutes % 60;
    const hours        = Math.floor(totalMinutes / 60);

    return `${hours}H : ${minutes} M : ${seconds} S`;
}


