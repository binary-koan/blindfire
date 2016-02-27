export default function EventHandler() {
  const listeners = {};

  function fetchListeners(name) {
    return listeners[name] || [];
  }

  function emit(name, data) {
    fetchListeners(name).forEach(fn => fn(data));
  }

  function on(name, listener) {
    listeners[name] = fetchListeners(name).concat(listener);
  }

  return { emit, on };
}
