export const onScrollList = (event, hasMore, setPageNumber) => {
  const scrollBottom =
    event.target.scrollTop + event.target.offsetHeight ===
    event.target.scrollHeight;

  if (scrollBottom && hasMore) {
    setPageNumber((page) => (page ? ++page : 2));
  }
};
