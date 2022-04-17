import React from 'react';
import { SearchProps } from '../App';
import { debounce } from 'lodash-es';
import { useLatest } from 'react-use';

function useDebounce(callback: (...args: unknown[]) => void, ms: number) {
  const latestCb = useLatest(callback);

  return React.useMemo(
    () =>
      debounce((...args) => {
        latestCb.current(...args);
      }, ms),
    [ms, latestCb],
  );
}

const Search: React.FC<SearchProps> = ({ onSubmit, serverRequest }) => {
  const [inputSearch, setInputSearch] = React.useState({
    search: '',
  });

  const textSearch: string = inputSearch.search;

  const makeRequest = useDebounce(() => {
    onSubmit(textSearch);
    setInputSearch({ search: '' });
  }, 500);

  function onChangeInput(event: any) {
    const { name, value } = event.target;
    setInputSearch({
      ...inputSearch,
      [name]: value,
    });
    makeRequest(textSearch);
  }

  function sendForm(event: any) {
    if (inputSearch.search.trim()) {
      onSubmit(textSearch);
      setInputSearch({ search: '' });
      event.preventDefault();
    }
    event.preventDefault();
  }

  function sendRequest() {}
  return (
    <div>
      <form onSubmit={sendForm} className="app-form">
        <input
          name="search"
          value={inputSearch.search}
          type="search"
          className="app-input"
          placeholder="Укажите GitHub-аккаунт"
          onChange={onChangeInput}
        />
        <button disabled={serverRequest} onClick={sendRequest} className="app-form_btn">
          {serverRequest ? 'Загрузка' : 'Найти'}
        </button>
      </form>
    </div>
  );
};

export default Search;
