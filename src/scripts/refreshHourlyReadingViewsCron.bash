# This aggregates the readings data at hour level.
# This should be copied to /etc/ or /etc/cron.hourly/ or /etc/cron.daily and the copy renamed so that its function will be clear to admins.

# The absolute path the project root directory (OED)
cd '/example/path/to/project/OED'

# The following line should NOT need to be edited except by devs.
docker-compose run --rm web npm run --silent refreshHourlyReadingViews &>> /dev/null &
