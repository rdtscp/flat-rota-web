// import axios from 'axios';


const network = {

    /* @TODO: Checks if the local authentication token is valid. */
    isAuthorised: function(localToken, cb) {
        return (
            setTimeout(() => {
                cb(false);
            }, 2000)
        );
    },

    // // Gets a CSRF token from API, and returns it in a callback.
    // getCSRF: function(cb) {
    //     return (
    //         axios({
    //             method:'GET',
    //             url:'https://localhost:3000',
    //             withCredentials: true,
    //             contentType: 'json',
    //         })
    //         .then((response) => {
    //             return cb(response.data._csrf);
    //         })
    //     );
    // },

}

export default network;