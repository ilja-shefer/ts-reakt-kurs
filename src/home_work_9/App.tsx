import React, { useEffect } from 'react';
import axios from 'axios';
import './App.scss';

import GitHubUser, { GitHubUserProps } from './components/GitHubUser';
import Search from './components/Search';

export type SearchProps = {
  onSubmit: (search: string) => Promise<void>;
  serverRequest: boolean;
};

function App() {
  const [profile, setProfile] = React.useState<GitHubUserProps | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  const [serverRequest, setServerRequest] = React.useState(false);

  const isMounted = React.useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      getProfile(window.location.search.split('=')[1]);
    } else {
      isMounted.current = true;
    }
  }, []);

  const getProfile = async (search: string) => {
    try {
      setServerRequest(true);
      const { data } = await axios.get(`https://api.github.com/users/${search}`);
      setProfile(data);
      const url = new URL(`http://localhost:3000/?login=${search}`);
      window.history.replaceState(null, '', url);
      setServerRequest(false);
    } catch (error: any) {
      console.log(error.messege);
      setNotFound(true);
      setProfile(null);
      setServerRequest(false);
      window.history.replaceState(null, '', '/');
    }
  };
  return (
    <div>
      <div id="app">
        <div className="app-container">
          <Search onSubmit={getProfile} serverRequest={serverRequest} />
          {notFound && <h1>Ничего не найдено!!!</h1>}
          {profile && (
            <GitHubUser
              name={profile.name}
              login={profile.login}
              bio={profile.bio}
              avatar_url={profile.avatar_url}
              public_repos={profile.public_repos}
              followers={profile.followers}
              following={profile.following}
              location={profile.location}
              blog={profile.blog}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
