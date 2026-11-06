# Daily visitors to www.duncan-webb.com (GoatCounter), with a 7-day rolling mean.
# Input: visitors_daily.csv from pull_visitors.py. Output: visitors_over_time.png
suppressPackageStartupMessages({ library(ggplot2) })

args <- commandArgs(trailingOnly = FALSE)
here <- dirname(normalizePath(sub("^--file=", "", args[grep("^--file=", args)])))
d <- read.csv(file.path(here, "visitors_daily.csv"))
d$day <- as.Date(d$day)
d$avg7 <- as.numeric(stats::filter(d$visitors, rep(1 / 7, 7), sides = 1))

last_avg <- d[d$day == min(d$day) + 40, ]  # label the line in the calm early stretch
peak <- d[which.max(d$visitors), ]

p <- ggplot(d, aes(day)) +
  geom_col(aes(y = visitors), fill = "grey78", width = 0.9) +
  geom_line(aes(y = avg7), colour = "#1f5a8a", linewidth = 0.9, na.rm = TRUE) +
  annotate("text", x = last_avg$day, y = last_avg$avg7, label = "7-day average",
           colour = "#1f5a8a", hjust = 0.5, vjust = -4, size = 3.4) +
  annotate("text", x = peak$day, y = peak$visitors,
           label = paste0(format(peak$day, "%d %b"), ": ", peak$visitors),
           hjust = -0.1, vjust = 1, size = 3.4, colour = "grey30") +
  scale_x_date(date_breaks = "2 weeks", date_labels = "%d %b") +
  labs(x = NULL, y = "Visitors per day",
       title = "Daily visitors to duncan-webb.com",
       subtitle = sprintf("%s to %s, %s visitors in total (GoatCounter)",
                          format(min(d$day), "%d %b %Y"), format(max(d$day), "%d %b %Y"),
                          format(sum(d$visitors), big.mark = ","))) +
  theme_minimal(base_size = 12) +
  theme(panel.grid.minor = element_blank(), panel.grid.major.x = element_blank(),
        plot.title = element_text(face = "bold"))

ggsave(file.path(here, "visitors_over_time.png"), p, width = 9, height = 4.5, dpi = 200, bg = "white")
