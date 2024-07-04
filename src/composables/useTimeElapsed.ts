import i18n from "@/plugins/i18n";

export function useTimeElapsed(date: string) {
  const { t } = i18n.global;
  const calculateInterval = () => {
    const createdAt = new Date(date);
    const now = new Date();
    const interval = now.getTime() - createdAt.getTime();

    const minutes = Math.floor(interval / 60000);
    const hours = Math.floor(interval / 3600000);
    const days = Math.floor(interval / 86400000);

    if (days > 0) {
      if (days > 1) {
        return t("general.days_elapsed", { days: days });
      }
      return t("general.day_elapsed", { day: days });
    } else if (hours > 0) {
      if (hours > 1) {
        return t("general.hours_elapsed", { hours: hours });
      }
      return t("general.hour_elapsed", { hour: hours });
    } else {
      if (minutes > 1) {
        return t("general.minutes_elapsed", { minutes: minutes });
      }
      return t("general.minute_elapsed", { minute: minutes });
    }
  };

  return { calculateInterval };
}
