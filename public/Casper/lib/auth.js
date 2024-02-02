
const AUTH_INFO_KEY = 'authInformation';
let blocked = false;

function logoutUser() {
	clearAuthInformation();
}

function setAuthInformation(token, login) {
	
	const  authInfo = {
	    	"token":token,
	    	"login":login,
	    	"exp":getTokenExpirationDate(token)
	    };
			
	    localStorage.setItem(AUTH_INFO_KEY,  JSON.stringify(authInfo));
	    blocked=false;
}

function getAuthToken() {
	
	if (getAuthInformation()===null) {
		return 'empty;'
	}
	
	return getAuthInformation().token;
	
}

function getAuthInformation() {
	
	authInfo=JSON.parse(localStorage.getItem(AUTH_INFO_KEY));

	if (authInfo!=null) {
		time = getExpirationTimeInSecond(authInfo.token);

		if (!blocked && time<1000) {
			blocked=true;
	        axios({
	            method: 'post',
	            url: '/Casper/v1/auth/refresh',
	            data: {
                    token : authInfo.token,
	                login : authInfo.login,
	                date : Date.now()
	            }
	        })
	        .then(data=>setAuthInformation(data.data.jeton, authInfo.login))
	        .catch((error)=>{console.error(error)});
			
		}
	}

    return authInfo;
    
}


function clearAuthInformation() {
    localStorage.removeItem(AUTH_INFO_KEY);
}

function isLoggedIn() {
	return true;
    //let authInfo = getAuthInformation();
    //return !!authInfo && !isTokenExpired(authInfo.token);
}

function getTokenExpirationDate(encodedToken) {
    
    if (!encodedToken) {
        return null
    }
    
    const jwtPayload = JSON.parse(window.atob(encodedToken.split('.')[1]));
    if (!jwtPayload.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(jwtPayload.exp)
  
    return date
}

function getExpirationTimeInSecond(encodedToken) {
    
    if (!encodedToken) {
        return null
    }
    
    const jwtPayload = JSON.parse(window.atob(encodedToken.split('.')[1]));
    if (!jwtPayload.exp) {
        return null
    }
    
    return (jwtPayload.exp-(Date.now()/1000));
}

function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}