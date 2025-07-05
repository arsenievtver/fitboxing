// src/helpers/ApiClient.js
import axios from 'axios';
import { PREFIX, JWT_STORAGE_KEY, refreshUrl } from './constants';

const REFRESH_TOKEN_KEY = 'refresh_token_ios';

function isIOS() {
	return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

export function createApi(navigate) {
	const api = axios.create({
		baseURL: PREFIX,
		withCredentials: true
	});

	// ⛳ Access Token подставляется как обычно
	api.interceptors.request.use(cfg => {
		if (!cfg.url.includes('refresh')) {
			const t = localStorage.getItem(JWT_STORAGE_KEY);
			if (t) cfg.headers.Authorization = `Bearer ${t}`;
		}
		return cfg;
	});

	let refreshing = false;
	let queue = [];

	const subscribe = (cb) => queue.push(cb);
	const publish = (tok, err) => {
		queue.forEach(cb => cb(tok, err));
		queue = [];
	};

	api.interceptors.response.use(
		resp => resp,
		async (err) => {
			const { response, config } = err;
			const original = config;

			if (response?.status === 401 && !original._retry) {
				if (refreshing) {
					return new Promise((res, rej) =>
						subscribe((tok, e) => e
							? rej(e)
							: res(api({
								...original,
								headers: { ...original.headers, Authorization: `Bearer ${tok}` }
							}))
						)
					);
				}

				original._retry = true;
				refreshing = true;

				try {
					let data;

					// 🧠 iOS → шлём refresh_token в теле
					if (isIOS()) {
						const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);
						if (!refresh_token) {
							return Promise.reject(new Error('Missing refresh token on iOS'));
						}
						({ data } = await axios.post(refreshUrl, { refresh_token }));
					} else {
						({ data } = await api.post(refreshUrl, {}));
					}

					const newToken = data.access_token;
					localStorage.setItem(JWT_STORAGE_KEY, newToken);
					api.defaults.headers.Authorization = `Bearer ${newToken}`;
					publish(newToken);

					original.headers.Authorization = `Bearer ${newToken}`;
					return api(original);
				} catch (e) {
					publish(null, e);
					localStorage.removeItem(JWT_STORAGE_KEY);
					navigate('/');
					return Promise.reject(e);
				} finally {
					refreshing = false;
				}
			}

			return Promise.reject(err);
		}
	);

	return api;
}
