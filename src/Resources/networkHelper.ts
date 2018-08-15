import axios                                          from 'axios';

const network = {

    // Gets a CSRF token from API, and returns it in a callback.
    getCSRF(cb: (csrfToken: string) => void) {
      axios.get(process.env.REACT_APP_API_URL + '/csrfToken', {
        withCredentials: true,
      })
      .then((response) => {
        return cb(response.data._csrf);
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
        return cb('');
      })
    },

}

export default network;