# Github Typeahead

This project is a demonstration of Github typeahead, where you can search for Github users and suggestions will render in a dropdown menu under the search bar.

## Technologies

* React (frontend)
* Vercel (for deployment)

## Demo

Demo is located here: [Link](https://github-typeahead-4gf3nvox8.vercel.app/)

## Fetching User Data

* The endpoint for user data is (https://api.github.com/search/users?q=${query}). An authorization token is needed to make unlimited requests to the API. Otherwise, you will get an error after a few requests.

```javascript
const fetchUserData = (query) => {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        // Github authentication is needed for unlimited requests
        authorization: "token " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => setUserData(responseJson))
      .catch((error) => console.log(error));
  };
```

* I added a condition under useEffect; so users need to type more than 2 characters before the request is made to the API.

```javascript
useEffect(() => {
    if (query.length > 2) {
      fetchUserData(query);
    } else {
      setUserData({items: []});
    }
  }, [query]);
```





