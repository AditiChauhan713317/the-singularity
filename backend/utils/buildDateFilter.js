export const buildDateFilter = ({ date, month, year, week }) => {
    if (date) {
        const selected = new Date(date);
        if (isNaN(selected.getTime())) throw new Error('Invalid date format');
        const start = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
        const end = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate() + 1);
        return { $gte: start, $lt: end };
    }

    if (week && month && year) {
        const y = parseInt(year);
        const m = parseInt(month) - 1;
        const w = parseInt(week);
        if (isNaN(y) || y < 1000 || y > 9999 || isNaN(m) || m < 0 || m > 11 || isNaN(w) || w < 1) {
            throw new Error("Invalid week, month, or year");
        }
        const firstOfMonth = new Date(y, m, 1);
        const lastOfMonth = new Date(y, m + 1, 0);
        const totalDays = lastOfMonth.getDate();
        const firstDayOfWeek = firstOfMonth.getDay();
        const totalWeeks = Math.ceil((totalDays + firstDayOfWeek) / 7);
        if (w > totalWeeks) throw new Error(`Week ${w} exceeds max weeks (${totalWeeks}) in month ${month}`);
        let start = new Date(y, m, 1 + (w - 1) * 7 - firstDayOfWeek);
        if (start < firstOfMonth) start = firstOfMonth;
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        return { $gte: start, $lt: end };
    }

    if (month && year) {
        const m = parseInt(month) - 1;
        const y = parseInt(year);
        if (isNaN(m) || isNaN(y) || m < 0 || m > 11 || y < 1000 || y > 9999) {
            throw new Error("Invalid month or year");
        }
        const start = new Date(y, m, 1);
        const end = new Date(y, m + 1, 1);
        return { $gte: start, $lt: end };
    }

    if (year) {
        const y = parseInt(year);
        if (isNaN(y) || y < 1000 || y > 9999) {
            throw new Error("Invalid year");
        }
        const start = new Date(y, 0, 1);
        const end = new Date(y + 1, 0, 1);
        return { $gte: start, $lt: end };
    }

    return null;
};