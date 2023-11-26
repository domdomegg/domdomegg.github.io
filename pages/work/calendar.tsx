const RedirectPage = () => {
  if (typeof window !== 'undefined') {
    window.location.replace('https://calendar.google.com/calendar/u/0/embed?src=adam@bluedotimpact.org&mode=WEEK');
  }
  return <div />;
};

export default RedirectPage;
