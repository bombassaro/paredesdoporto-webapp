import Service from './service';

export const COLLECTION_RFRSH = 'COLLECTION/RFRSH';

export const COLLECTION_START = 'COLLECTION/START';
export const COLLECTION_FAILR = 'COLLECTION/FAILR';
export const COLLECTION_SCCES = 'COLLECTION/SCCES';
export const COLLECTION_CLEAR = 'COLLECTION/CLEAR';
/*colleclink*/
export const COLLECLINK_START = 'COLLECLINK/START';
export const COLLECLINK_SCCES = 'COLLECLINK/SCCES';
export const COLLECLINK_CLEAR = 'COLLECLINK/CLEAR';
/*data-link*/
export const COLLDTLINK_START = 'COLLDTLINK/START';
export const COLLDTLINK_SCCES = 'COLLDTLINK/SCCES';
export const COLLDTLINK_CLEAR = 'COLLDTLINK/CLEAR';
/*LROOTDPRTO-link*/
export const LROOTDPRTO_START = 'LROOTDPRTO/START';
export const LROOTDPRTO_SCCES = 'LROOTDPRTO/SCCES';
export const LROOTDPRTO_FAILR = 'LROOTDPRTO/FAILR';

export const cleanCollectionLinks = () => async dispatch => {
  dispatch({ type: COLLDTLINK_CLEAR });
}

export const refreshCollection = (status) => async dispatch => {
  dispatch({ type: COLLECTION_RFRSH, payload: status });
}

export const reloadCollection = (status) => async dispatch => {
  dispatch({ type: COLLECTION_CLEAR });
  dispatch({ type: COLLECLINK_CLEAR });
}

export const loadRootDpto = () => async dispatch => {
  dispatch({ type: LROOTDPRTO_START });
  const filters = {
    "filters": {},
    "sorters": { 
      "limit": 10000, 
      "skip": 0, 
      "sort": { 
        "createdAt": 1 
      }
    }
  }
  const payload = await Service.collectionsFromRoot(filters);

  if(payload.status) {
    dispatch({ type: LROOTDPRTO_SCCES, payload });
  } else {
    dispatch({ type: LROOTDPRTO_FAILR, payload });
  }
}
export const loadCollection = (content) => async dispatch => {
  dispatch({ type: COLLECTION_START });
  dispatch({ type: COLLECLINK_START });
  const { main, tag, id } = content
  const filters = {
    "filters": {
      "main": main
    },
    "sorters": { 
      "limit": 10000, 
      "skip": 0, 
      "sort": { 
        "createdAt": 1 
      }
    }
  }
  const payload = await Service.collectionsFromRoot(filters);

  if(payload.status) {
    dispatch({ type: COLLECTION_SCCES, payload });
  } else {
    dispatch({ type: COLLECTION_FAILR, payload });
  }
  dispatch({ type: COLLECLINK_CLEAR });
}

export const loadCollecLink = (content) => async dispatch => {
  dispatch({ type: COLLECLINK_START });
  const { main, tag, postid, subsl } = content
  const filters = {
    "filters": {},
    "sorters": { 
      "limit": 10000, 
      "skip": 0, 
      "sort": { 
        "_id": -1
      }
    }
  }
  if(tag && (!subsl || subsl.length === 0)) {
    filters.filters = {
      "tags": {"$in": [tag.toUpperCase()]}
    }
  } else if(tag && subsl && subsl.length > 0) {
    filters.filters = {
      "parents": {"$in": subsl},
      "tags": {"$in": [tag.toUpperCase()]}
    }
  } else if(subsl && subsl.length > 0) {
    filters.filters = {
      "parents": {"$in": subsl}
    }
  } else {
    filters.filters = {}
  }

  const payload = await Service.postsByCollections(filters);
  if(payload.status) {
    dispatch({ type: COLLECLINK_SCCES, payload });
  } else {
    dispatch({ type: COLLECTION_FAILR, payload });
  }
}

export const loadDataLink = (content) => async dispatch => {
  dispatch({ type: COLLDTLINK_START });
  const { postid } = content
  const filters = {
    "filters": {},
    "sorters": { 
      "limit": 10, 
      "skip": 0, 
      "sort": { 
        "_id": -1
      }
    }
  }
  filters.filters = { "_id": postid }

  const payload = await Service.postsByCollections(filters);
  if(payload.status) {
    dispatch({ type: COLLDTLINK_SCCES, payload });
  } else {
    dispatch({ type: COLLECTION_FAILR, payload });
  }
}
