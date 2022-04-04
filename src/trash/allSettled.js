export default function allSettled(promises) {
  const wrapper = promise => (
    promise
      .then((value) => ({status: 'resolved', value}))
      .catch((reason) => ({status: 'rejected', reason}))
  );

  return Promise.all(promises.map(wrapper));
}
