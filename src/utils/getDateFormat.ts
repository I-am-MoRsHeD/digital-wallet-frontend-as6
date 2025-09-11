

export const getDateFormat = (dateString: string): string => {
    return (
        dateString ? new Date(dateString).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }) : "-"
    )
};