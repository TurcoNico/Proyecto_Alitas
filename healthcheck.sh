if pgrep -f "manage.py runserver"; then
  echo "The process manage.py runserver... is working."
  exit 0
else
  echo "The process manage.py runserver... is not working."
  exit 1
fi
