const API_BASE_URL = "http://localhost/admisoft/";

/**
 * Effectue une requête GET vers l'API.
 * @param {string} endpoint - L'endpoint de l'API (ex: 'users', 'login')
 * @returns {Promise<any>}
 */
export async function apiGet(endpoint) {
    const response = await fetch(API_BASE_URL + endpoint, {
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Erreur API : ' + response.status);
    }
    return response.json();
}

export async function registerUser(data) {
    const response = await fetch("http://localhost/admisoft/registration.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur API : ' + response.status);
    }
    return result;
}

export async function loginUser(data) {
    const response = await fetch("http://localhost/admisoft/login.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur API : ' + response.status);
    }
    return result;
}

export async function verifyEmail(email, token) {
    const url = `http://localhost/admisoft/verify.php?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });
    // L'API peut rediriger, donc on tente de parser le JSON, sinon on considère que c'est OK
    let result = {};
    try {
        result = await response.json();
    } catch (e) {
        // Si pas de JSON, c'est probablement une redirection réussie
    }
    if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur API : ' + response.status);
    }
    return result;
}

export async function forgotPassword(email) {
    const response = await fetch("http://localhost/admisoft/forget-password.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: `email=${encodeURIComponent(email)}`
    });
    const result = await response.json();
    if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur API : ' + response.status);
    }
    return result;
}

export async function logoutUser() {
    const response = await fetch("http://localhost/admisoft/logout.php", {
        method: 'GET',
        credentials: 'include'
    });
    // L'API PHP redirige, donc on ne peut pas suivre la redirection côté JS.
    // On considère que la déconnexion est toujours réussie si la requête ne plante pas.
    if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
    }
    return true;
}

export async function getCart() {
    const response = await fetch("http://localhost/admisoft/cart.php", {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du panier');
    }
    return await response.json();
}