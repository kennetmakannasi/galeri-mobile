import { months } from "../components/json/months";

export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} day ago`;

    const monthIndex = Number(dateString.slice(5, 7).replace("0", ""));
    const monthName = months[monthIndex];

    const time = dateString.slice(11, 16);
    const hour = Number(dateString.slice(11, 13));

    const ampm = hour < 12 ? "am" : "pm";

    return `${time} ${ampm} · ${monthName} ${dateString.slice(8, 10)}, ${dateString.slice(0, 4)}`;
}
