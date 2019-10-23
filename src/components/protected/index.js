import React, { useState, useEffect } from 'react';
import { Subject, from } from 'rxjs';
import { filter, flatMap, debounceTime } from 'rxjs/operators';
import Auth0 from '../../auth';

const Protected = () => {
    const input$ = new Subject();
    // const [ message, setMessage ] = useState('');
    const [ user, setUser ] = useState(null);

    useEffect(() => {
      const getGithubUser = async username => {
        await fetch(
          `https://api.github.com/users/${username}`
        ).then(res => res.json())
      };
      const githubUser = username => from((username = getGithubUser(username)));    
      input$
        .pipe(
          debounceTime(3000),
          filter(value => value.length > 3),
          flatMap(githubUser)
        )
        .subscribe(user => setUser(user));
    }, [])

    return (
      <div>
          <p className="mb-10 text-xl">
              Type in any GitHub username to view information
          </p>

          {user && (
              <div className="mb-4">
                  <img src={user.avatar_url} alt="GitHub Avatar" width="200" className="shadow rounded mb-2" />
                  <h3 className="text-2xl text-blue-darker">{user.login}</h3>
              </div>
          )}
          <input onChange={e => input$.next(e.target.value)} placeholder="GitHub Username Here" className="py-3 px-4 rounded shadow w-64" />
          <button onClick={() => Auth0.signOut()} className="mx-auto mt-5 p-2 text-xs block rounded bg-blue-lightest text-blue-darker hover:bg-blue-lightest">
              Log Out
          </button>
      </div>
    );
};

export default Protected;