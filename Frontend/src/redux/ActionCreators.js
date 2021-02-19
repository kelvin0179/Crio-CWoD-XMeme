import * as  ActionTypes from './ActionTypes';
import { baseUrl, postAndPatchUrl } from "./baseUrl";

//Get the memes
export const fetchMemes = () => (dispatch) => {
    return fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(memes => {
            dispatch(addMeme(memes))
        })
        .catch(err => dispatch(memeFailed(err.message)));
};

//Post the memes
export const postMemes = (name, caption, url) => (dispatch) => {
    const jsData = {
        name: name,
        caption: caption,
        url: url
    }
    fetch(postAndPatchUrl, {
        method: 'POST',
        body: JSON.stringify(jsData),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
        .then(response => response.json())
        .then(response => dispatch(addMeme(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your meme could not be posted\nError: ' + error.message);
        });
};

//Delete the meme with ID
export const deleteMemes = (memeID) => (dispatch) => {

    fetch(postAndPatchUrl + memeID, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
        .then(response => response.json())
        .then(response => dispatch(addMeme(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your meme could not be deleted\nError: ' + error.message);
        });
};

//Update the meme with ID
export const updateMemes = (memeID, name, caption, url) => (dispatch) => {
    const jsData = {
        name: name,
        caption: caption,
        url: url
    }
    fetch(postAndPatchUrl + memeID, {
        method: 'PATCH',
        body: JSON.stringify(jsData),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })
        .then(response => response.json())
        .then(response => dispatch(addMeme(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your meme could not be updated\nError: ' + error.message);
        });
};

export const memeFailed = (errMess) => ({
    type: ActionTypes.MEMES_FAILED,
    payload: errMess
});
export const addMeme = (memes) => ({
    type: ActionTypes.ADD_MEMES,
    payload: memes
});
