import {useState} from 'react';

export const usePost = <T>(url: string, defaultData?: T) => {
  const [data, setData] = useState<T | undefined>(defaultData);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const setDefault = () => {
    setSuccess(false);
    setLoading(true);
    setError(undefined);
    setData(defaultData);
  };

  const post = async (params?: {json?: {}; query?: {}}) => {
    setDefault();
    console.log(
      'Fetching from: ' + url + '?' + new URLSearchParams(params?.query),
    );
    console.log('Loading...');
    return fetch(url + '?' + new URLSearchParams(params?.query), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params?.json),
    })
      .then(async response => {
        console.log('Response returned');
        if (response.ok) {
          return response
            .json()
            .then(data => {
              setData(data);
              setSuccess(true);
              setLoading(false);
              console.log('Status: ' + response.status);
              console.log('Data: ' + JSON.stringify(data));
              return true;
            })
            .catch(() => {
              setSuccess(true);
              setLoading(false);
              console.log('Status: ' + response.status);
              console.log('No data');
              return true;
            });
        } else {
          return response
            .text()
            .then(errorMsg => {
              setError(errorMsg);
              setSuccess(false);
              setLoading(false);
              console.log('Status: ' + response.status);
              console.log('Error Msg: ' + errorMsg);
              return false;
            })
            .catch(() => {
              setError('Something went wrong...');
              setSuccess(false);
              setLoading(false);
              console.log('Status: ' + response.status);
              console.log('Error Msg: Something went wrong...');
              return false;
            });
        }
      })
      .catch(error => {
        setError(error);
        setSuccess(false);
        setLoading(false);
        return false;
      });
  };

  return {post, data, success, loading, error};
};
