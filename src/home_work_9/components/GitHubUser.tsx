import React from 'react';

export type GitHubUserProps = {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: string;
  followers: number;
  following: number;
  location: string;
  blog: string;
};

const GitHubUser: React.FC<GitHubUserProps> = ({
  name,
  login,
  bio,
  avatar_url,
  location,
  blog,
  public_repos,
  followers,
  following,
}) => {
  function calcFolowers(value: number) {
    if (value < 1000) {
      return value;
    } else {
      return (value / 1000).toFixed(1) + 'K';
    }
  }

  return (
    <div className="app-user">
      <div className="app-user_info">
        <div className="app-user_image">
          <img src={avatar_url} alt="" />
        </div>
        <div className="app-user_data">
          <h1 className="app-user_name">
            {name}
            <span>{login}</span>
          </h1>
          <p className="app-user_about">{bio}</p>
        </div>
      </div>
      <ul className="app-user_stats">
        <li className="app-user_stats-item">
          Репозитории
          <span>{public_repos}</span>
        </li>
        <li className="app-user_stats-item">
          Подписчики
          <span>{calcFolowers(followers)}</span>
        </li>
        <li className="app-user_stats-item">
          Подписки
          <span>{following}</span>
        </li>
      </ul>
      <ul className="app-user_location">
        <li className="app-user_location-item">{location}</li>
        <li className="app-user_location-item">
          <a href={blog}>{blog}</a>
        </li>
      </ul>
    </div>
  );
};

export default GitHubUser;
