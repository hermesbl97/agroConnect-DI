package com.svalero.agroconnect.util;

import java.time.LocalDate;

public class DateUtil {
    public static LocalDate getFutureDate(LocalDate startDate, long days) {
        return startDate.plusDays(days);
    }
}
