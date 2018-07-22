
export function host(url) {
  const h = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = h.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return `${time}${label}s`;
}

export function timeAgo(time) {
  const { floor } = Math;
  const between = (Date.now() / 1000) - Number(time);
  if (between < 3600) {
    return pluralize(floor(between / 60), ' minute');
  }
  if (between < 86400) {
    return pluralize(floor(between / 3600), ' hour');
  }

  return pluralize(floor(between / 86400), ' day');
}
